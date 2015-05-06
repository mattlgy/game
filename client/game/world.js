var shiftAmount = 8;
var Game;
(function (Game) {
    var World = (function () {
        function World() {
            this.chunks = {};
        }
        World.prototype.newChunk = function (x, z, data) {
            var i = (x << shiftAmount) + z;
            this.chunks[i] = new Game.Chunk({ x: x, z: z, data: data });
            return this.chunks[i];
        };
        World.prototype.get = function (x, z) {
            var i = (x << shiftAmount) + z;
            return this.chunks[i];
        };
        World.prototype.getChunk = function (x, z) {
            x = Math.floor(x / Game.CHUNK_SIZE_X);
            z = Math.floor(z / Game.CHUNK_SIZE_Z);
            return this.get(x, z);
        };
        World.prototype.getBlock = function (x, y, z) {
            var chunk = this.getChunk(x, z);
            if (!chunk)
                return null;
            return chunk.getWorldBlock(x, y, z);
        };
        return World;
    })();
    Game.World = World;
})(Game || (Game = {}));
