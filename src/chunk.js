import THREE from 'three'
import Block from './block'

export var CHUNK_SIZE_X = 4
export var CHUNK_SIZE_Y = 8
export var CHUNK_SIZE_Z = 4
export var BLOCKS_PER_CHUNK = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z

export default class Chunk extends THREE.Object3D {
  constructor ({ data, x, z }) {
    super({})

    this.data = data
    this.x = x
    this.z = z

    this.position.x = x * CHUNK_SIZE_X
    this.position.z = z * CHUNK_SIZE_Z
  }

  getLocalBlock (x, y, z) {
    x = Math.floor(x)
    z = Math.floor(z)
    y = Math.floor(y)
    // var i = z + x * CHUNK_SIZE_X + y * CHUNK_SIZE_Y
    // var i = z + CHUNK_SIZE_X * (x + CHUNK_SIZE_Y * y)
    var i = z + (x * CHUNK_SIZE_X) + (y * CHUNK_SIZE_X * CHUNK_SIZE_Z)
    return this.data[i] != undefined ? this.data[i] : null
  }

  getWorldBlock (x, y, z) {
    return this.getLocalBlock(x % CHUNK_SIZE_X, y, z % CHUNK_SIZE_Z)
  }

  render () {
    var x = 0
    var y = 0
    var z = 0
    var i = 0
    var b

    // xOff = this.x * CHUNK_SIZE_X
    // zOff = this.z * CHUNK_SIZE_Z

    while (i < BLOCKS_PER_CHUNK) {
      if (this.data[i]) {
        b = new Block({ x, y, z })
        // b.position.x = x // + xOff
        // b.position.y = y
        // b.position.z = z // + zOff
        this.add(b)
        // blocks.push(b)
      }
      i++

      z++
      if (z >= CHUNK_SIZE_Z) {
        z = 0
        x++
      }
      if (x >= CHUNK_SIZE_X) {
        x = 0
        y++
      }
    }
  }
}
