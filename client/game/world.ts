var shiftAmount = 8

module Game {
    export class World {

        chunks: any

        constructor() {
            this.chunks = {}
        }

        newChunk(x, z, data) {
            var i = (x << shiftAmount) + z
            this.chunks[i] = new Chunk({ x, z, data })
            return this.chunks[i]
        }

        get(x, z) {
            var i = (x << shiftAmount) + z
            return this.chunks[i]
        }

        getChunk(x, z): Game.Chunk {
            x = Math.floor(x / CHUNK_SIZE_X)
            z = Math.floor(z / CHUNK_SIZE_Z)
            return this.get(x, z)
        }

        getBlock(x, y, z) {
            var chunk = this.getChunk(x, z)
            if (!chunk) return null
            return chunk.getWorldBlock(x, y, z)
        }
    }
}
