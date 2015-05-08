var shiftAmount = 8;
var Game;
(function (Game) {
    var World = (function () {
        function World() {
            this.chunks = {};
        }
        World.prototype.hashChunkCoords = function (x, z) {
            return x + ',' + z;
        };
        World.prototype.newChunk = function (x, z, data) {
            var i = this.hashChunkCoords(x, z);
            this.chunks[i] = new Game.Chunk({ x: x, z: z, data: data });
            return this.chunks[i];
        };
        World.prototype.getChunk = function (x, z) {
            var i = this.hashChunkCoords(x, z);
            return this.chunks[i];
        };
        World.prototype.getChunkWorldCoords = function (x, z) {
            x = Math.floor(x / Game.CHUNK_SIZE_X);
            z = Math.floor(z / Game.CHUNK_SIZE_Z);
            return this.getChunk(x, z);
        };
        World.prototype.getBlock = function (x, y, z) {
            var chunk = this.getChunkWorldCoords(x, z);
            if (!chunk)
                return null;
            return chunk.getBlockWorldCoords(x, y, z);
        };
        return World;
    })();
    Game.World = World;
})(Game || (Game = {}));
