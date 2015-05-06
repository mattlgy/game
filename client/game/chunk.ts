
module Game {
    export const CHUNK_SIZE_X = 4
    export const CHUNK_SIZE_Y = 8
    export const CHUNK_SIZE_Z = 4
    export const BLOCKS_PER_CHUNK = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z

    export class Chunk extends THREE.Object3D {

        data: Int32Array
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

        getLocalBlock(x: number, y: number, z: number) {
            x = Math.floor(x)
            z = Math.floor(z)
            y = Math.floor(y)
            // var i = z + x * CHUNK_SIZE_X + y * CHUNK_SIZE_Y
            // var i = z + CHUNK_SIZE_X * (x + CHUNK_SIZE_Y * y)
            var i = z + (x * CHUNK_SIZE_X) + (y * CHUNK_SIZE_X * CHUNK_SIZE_Z)
            return this.data[i] != undefined ? this.data[i] : null
        }

        getWorldBlock(x: number, y: number, z: number) {
            return this.getLocalBlock(x % CHUNK_SIZE_X, y, z % CHUNK_SIZE_Z)
        }

        render() {
            var x = 0
            var y = 0
            var z = 0
            var i = 0

            while (i < BLOCKS_PER_CHUNK) {
                if (this.data[i]) {
                    this.add(new Blocks.Base({ x, y, z }))
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
