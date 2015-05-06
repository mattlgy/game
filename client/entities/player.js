var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(_a) {
            var _this = this;
            var camera = _a.camera, world = _a.world;
            _super.call(this, { world: world });
            this.cameraObject = new THREE.Object3D();
            this.cameraObject.position.y = 3;
            this.cameraObject.add(camera);
            this.add(this.cameraObject);
            this.pointLight = new THREE.PointLight(0xFFFFFF);
            this.pointLight.position.y = 3;
            this.add(this.pointLight);
            var PI_2 = Math.PI / 2;
            document.addEventListener('mousemove', function (event) {
                var movementX = event.movementX;
                var movementY = event.movementY;
                _this.rotation.y -= movementX * 0.002;
                _this.cameraObject.rotation.x -= movementY * 0.002;
                _this.cameraObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, _this.cameraObject.rotation.x));
            }, false);
            this.movingForward = false;
            this.movingBackward = false;
            this.movingLeft = false;
            this.movingRight = false;
            this.movingUp = false;
            this.movingDown = false;
            document.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        _this.movingForward = true;
                        break;
                    case 37:
                    case 65:
                        _this.movingLeft = true;
                        break;
                    case 40:
                    case 83:
                        _this.movingBackward = true;
                        break;
                    case 39:
                    case 68:
                        _this.movingRight = true;
                        break;
                    case 32:
                        _this.movingUp = true;
                        break;
                    case 16:
                        _this.movingDown = true;
                        break;
                }
            }, false);
            document.addEventListener('keyup', function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        _this.movingForward = false;
                        break;
                    case 37:
                    case 65:
                        _this.movingLeft = false;
                        break;
                    case 40:
                    case 83:
                        _this.movingBackward = false;
                        break;
                    case 39:
                    case 68:
                        _this.movingRight = false;
                        break;
                    case 32:
                        _this.movingUp = false;
                        break;
                    case 16:
                        _this.movingDown = false;
                        break;
                }
            }, false);
        }
        Player.prototype.tick = function (frame) {
            // console.log(this.position.x + ', ' + this.position.y + ', ' + this.position.z)
            this.velocity.x -= this.velocity.x * 10.0 * frame.delta;
            this.velocity.y -= this.velocity.y * 10.0 * frame.delta;
            this.velocity.z -= this.velocity.z * 10.0 * frame.delta;
            this.velocity.y -= 2.3;
            var dir = new THREE.Vector3();
            if (this.movingForward)
                dir.z -= 1;
            if (this.movingBackward)
                dir.z += 1;
            if (this.movingLeft)
                dir.x -= 1;
            if (this.movingRight)
                dir.x += 1;
            if (this.movingUp && this.canExistRelavtive(new THREE.Vector3(0, -0.5, 0)))
                this.velocity.y += 40;
            dir.normalize().applyEuler(this.rotation).multiplyScalar(this.speed);
            this.velocity.add(dir);
            if (Math.abs(this.velocity.x) < 0.01)
                this.velocity.x = 0;
            if (Math.abs(this.velocity.y) < 0.01)
                this.velocity.y = 0;
            if (Math.abs(this.velocity.z) < 0.01)
                this.velocity.z = 0;
            this.move(frame);
        };
        return Player;
    })(Entities.Base);
    Entities.Player = Player;
})(Entities || (Entities = {}));
