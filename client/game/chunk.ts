
module Game {
    export const CHUNK_SIZE_X = 4
    export const CHUNK_SIZE_Y = 8
    export const CHUNK_SIZE_Z = 4
    export const BLOCKS_PER_CHUNK = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z

    export class Chunk extends THREE.Object3D {

        data: Int32Array
        blocks: Array<Blocks.Base> = []
        x = 0
        z = 0

        constructor({ data, x, z }) {
            super()

            this.data = data
            this.x = x
            this.z = z

            this.position.x = x * CHUNK_SIZE_X
            this.position.z = z * CHUNK_SIZE_Z
        }

        getBlock(x: number, y: number, z: number): Blocks.Base {
            x = Math.floor(x)
            z = Math.floor(z)
            y = Math.floor(y)
            // var i = z + x * CHUNK_SIZE_X + y * CHUNK_SIZE_Y
            // var i = z + CHUNK_SIZE_X * (x + CHUNK_SIZE_Y * y)
            var i = z + (x * CHUNK_SIZE_X) + (y * CHUNK_SIZE_X * CHUNK_SIZE_Z)
            return this.blocks[i] // this.data[i] != undefined ? this.data[i] : null
        }

        getBlockWorldCoords(x: number, y: number, z: number): Blocks.Base {
            return this.getBlock(x % CHUNK_SIZE_X, y, z % CHUNK_SIZE_Z)
        }

        render() {
            var x = 0
            var y = 0
            var z = 0
            var i = 0
            var b: Blocks.Base

            while (i < BLOCKS_PER_CHUNK) {
                if (this.data[i]) {
                    b = new Blocks.Base({ x, y, z })
                    this.add(b)
                    this.blocks[i] = b
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
}
