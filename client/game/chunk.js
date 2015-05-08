var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    Game.CHUNK_SIZE_X = 4;
    Game.CHUNK_SIZE_Y = 8;
    Game.CHUNK_SIZE_Z = 4;
    Game.BLOCKS_PER_CHUNK = Game.CHUNK_SIZE_X * Game.CHUNK_SIZE_Y * Game.CHUNK_SIZE_Z;
    var Chunk = (function (_super) {
        __extends(Chunk, _super);
        function Chunk(_a) {
            var data = _a.data, x = _a.x, z = _a.z;
            _super.call(this);
            this.blocks = [];
            this.matrixAutoUpdate = false;
            this.data = data;
            this.x = x;
            this.z = z;
            this.position.x = x * Game.CHUNK_SIZE_X;
            this.position.z = z * Game.CHUNK_SIZE_Z;
            this.updateMatrix();
        }
        Chunk.prototype.getBlock = function (x, y, z) {
            x = Math.floor(x);
            z = Math.floor(z);
            y = Math.floor(y);
            var i = z + (x * Game.CHUNK_SIZE_X) + (y * Game.CHUNK_SIZE_X * Game.CHUNK_SIZE_Z);
            return this.blocks[i];
        };
        Chunk.prototype.getBlockWorldCoords = function (x, y, z) {
            x = x % Game.CHUNK_SIZE_X;
            x = (x + Game.CHUNK_SIZE_X) % Game.CHUNK_SIZE_X;
            z = z % Game.CHUNK_SIZE_Z;
            z = (z + Game.CHUNK_SIZE_Z) % Game.CHUNK_SIZE_Z;
            return this.getBlock(x, y, z);
        };
        Chunk.prototype.render = function () {
            var x = 0;
            var y = 0;
            var z = 0;
            var i = 0;
            var b;
            this.geometry = new THREE.Geometry();
            while (i < Game.BLOCKS_PER_CHUNK) {
                if (this.data[i]) {
                    b = new Blocks.Base({ x: x, y: y, z: z });
                    this.geometry.merge(b.mesh.geometry);
                    this.blocks[i] = b;
                }
                i++;
                z++;
                if (z >= Game.CHUNK_SIZE_Z) {
                    z = 0;
                    x++;
                }
                if (x >= Game.CHUNK_SIZE_X) {
                    x = 0;
                    y++;
                }
            }
        };
        return Chunk;
    })(THREE.Object3D);
    Game.Chunk = Chunk;
})(Game || (Game = {}));
