var shiftAmount = 8

module Game {
    export class World {

        chunks: any = {}

        constructor() {

        }

        private hashChunkCoords (x: number, z: number): string {
            return x + ',' + z
        }

        newChunk(x, z, data) {
            var i = this.hashChunkCoords(x, z)// (x << shiftAmount) + z
            this.chunks[i] = new Chunk({ x, z, data })
            return this.chunks[i]
        }

        getChunk(x: number, z: number): Game.Chunk {
            var i = this.hashChunkCoords(x, z)// (x << shiftAmount) + z
            return this.chunks[i]
        }

        getChunkWorldCoords(x: number, z: number): Game.Chunk {
            x = Math.floor(x / CHUNK_SIZE_X)
            z = Math.floor(z / CHUNK_SIZE_Z)
            return this.getChunk(x, z)
        }

        getBlock(x, y, z) {
            var chunk = this.getChunkWorldCoords(x, z)
            if (!chunk) return null
            return chunk.getBlockWorldCoords(x, y, z)
        }
    }
}
