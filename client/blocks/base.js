var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Blocks;
(function (Blocks) {
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base(_a) {
            var x = _a.x, y = _a.y, z = _a.z;
            _super.call(this);
            this.matrixAutoUpdate = false;
            this.mesh = this.makeMesh();
            this.position.x = x + 0.5;
            this.position.z = z + 0.5;
            this.position.y = y;
            this.updateMatrix();
            this.add(this.mesh);
        }
        Base.prototype.makeMesh = function () {
            var constructor = this.constructor;
            return new THREE.Mesh(constructor.geometry, constructor.material);
        };
        Base.geometry = new THREE.BoxGeometry(1, 1, 1);
        Base.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        return Base;
    })(THREE.Object3D);
    Blocks.Base = Base;
})(Blocks || (Blocks = {}));
