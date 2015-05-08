// var dxp = new THREE.Vector3(1, 0, 0)
// var dxn = new THREE.Vector3(-1, 0, 0)
// var dyp = new THREE.Vector3(0, 1, 0)
// var dyn = new THREE.Vector3(0, -1, 0)
// var dzp = new THREE.Vector3(0, 0, 1)
// var dzn = new THREE.Vector3(0, 0, -1)
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entities;
(function (Entities) {
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base(_a) {
            var world = _a.world;
            _super.call(this);
            this.speed = 0;
            this.size = 0;
            this.world = world;
            this.velocity = new THREE.Vector3();
        }
        Base.prototype.canExistHere = function (p) {
            var b = this.world.getBlock(p.x, p.y, p.z);
            return !b;
        };
        Base.prototype.canExistRelavtive = function (d) {
            return this.canExistHere(this.position.clone().add(d));
        };
        Base.prototype.getChunk = function () {
            var x = Math.floor(this.position.x / Game.CHUNK_SIZE_X);
            var z = Math.floor(this.position.z / Game.CHUNK_SIZE_Z);
            return this.world.getChunk(x, z);
        };
        Base.prototype.move = function (frame) {
            if (!this.canExistRelavtive(new THREE.Vector3(0, this.velocity.y * frame.delta, 0))) {
                this.velocity.y = 0;
            }
            this.position.y = this.position.y + this.velocity.y * frame.delta;
            if (!this.canExistRelavtive(new THREE.Vector3(this.velocity.x * frame.delta, 0, 0))) {
                if (this.canExistRelavtive(new THREE.Vector3(this.velocity.x * frame.delta, 1, 0)))
                    this.position.y = this.position.y + 1;
                else
                    this.velocity.x = 0;
            }
            this.position.x = this.position.x + this.velocity.x * frame.delta;
            if (!this.canExistRelavtive(new THREE.Vector3(0, 0, this.velocity.z * frame.delta))) {
                if (this.canExistRelavtive(new THREE.Vector3(0, 1, this.velocity.z * frame.delta)))
                    this.position.y = this.position.y + 1;
                else
                    this.velocity.z = 0;
            }
            this.position.z = this.position.z + this.velocity.z * frame.delta;
        };
        return Base;
    })(THREE.Object3D);
    Entities.Base = Base;
})(Entities || (Entities = {}));
