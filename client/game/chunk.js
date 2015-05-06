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
            this.x = 0;
            this.z = 0;
            this.data = data;
            this.x = x;
            this.z = z;
            this.position.x = x * Game.CHUNK_SIZE_X;
            this.position.z = z * Game.CHUNK_SIZE_Z;
        }
        Chunk.prototype.getLocalBlock = function (x, y, z) {
            x = Math.floor(x);
            z = Math.floor(z);
            y = Math.floor(y);
            var i = z + (x * Game.CHUNK_SIZE_X) + (y * Game.CHUNK_SIZE_X * Game.CHUNK_SIZE_Z);
            return this.data[i] != undefined ? this.data[i] : null;
        };
        Chunk.prototype.getWorldBlock = function (x, y, z) {
            return this.getLocalBlock(x % Game.CHUNK_SIZE_X, y, z % Game.CHUNK_SIZE_Z);
        };
        Chunk.prototype.render = function () {
            var x = 0;
            var y = 0;
            var z = 0;
            var i = 0;
            while (i < Game.BLOCKS_PER_CHUNK) {
                if (this.data[i]) {
                    this.add(new Blocks.Base({ x: x, y: y, z: z }));
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
