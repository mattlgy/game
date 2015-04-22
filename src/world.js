import Chunk, { CHUNK_SIZE_X, CHUNK_SIZE_Y, CHUNK_SIZE_Z } from './chunk'

var shiftAmount = 8

export default class World {
  constructor({  }) {
    this.chunks = {}
  }

  newChunk (x, z, data) {
    var i = (x << shiftAmount) + z
    this.chunks[i] = new Chunk({ x, z, data })
    return this.chunks[i]
  }

  get (x, z) {
    var i = (x << shiftAmount) + z
    return this.chunks[i]
  }

  getChunk (x, z) {
    x = Math.floor(x / CHUNK_SIZE_X)
    z = Math.floor(z / CHUNK_SIZE_Z)
    return this.get(x, z)
  }

  getBlock (x, y, z) {
    var chunk = this.getChunk(x, z)
    if (!chunk) return null
    return chunk.getWorldBlock(x, y, z)
  }
}
