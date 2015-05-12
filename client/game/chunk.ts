
module Game {
    export const CHUNK_SIZE_X = 4
    export const CHUNK_SIZE_Y = 8
    export const CHUNK_SIZE_Z = 4
    export const BLOCKS_PER_CHUNK = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z

    export class Chunk extends THREE.Object3D {

        data: Int32Array
        x: number
        z: number

        blocks: Array<Blocks.Base> = []

        mesh: THREE.Mesh
        // geometry: THREE.Geometry

        constructor({ data, x, z }) {
            super()

            this.matrixAutoUpdate = false

            this.data = data
            this.x = x
            this.z = z

            this.position.x = x * CHUNK_SIZE_X
            this.position.z = z * CHUNK_SIZE_Z

            this.updateMatrix()
        }

        getBlock(x: number, y: number, z: number): Blocks.Base {
            x = Math.floor(x)
            z = Math.floor(z)
            y = Math.floor(y)

            var i = x + (y * CHUNK_SIZE_Y) + (z * CHUNK_SIZE_X * CHUNK_SIZE_Y)
            // var i = z + (x * CHUNK_SIZE_X) + (y * CHUNK_SIZE_X * CHUNK_SIZE_Z)
            return this.blocks[i] // this.data[i] != undefined ? this.data[i] : null
        }

        getBlockWorldCoords(x: number, y: number, z: number): Blocks.Base {
            x = x % CHUNK_SIZE_X
            x = (x + CHUNK_SIZE_X) % CHUNK_SIZE_X

            z = z % CHUNK_SIZE_Z
            z = (z + CHUNK_SIZE_Z) % CHUNK_SIZE_Z

            return this.getBlock(x, y, z)
        }

        build() {
            var x = 0
            var y = 0
            var z = 0
            var i = 0
            var b: Blocks.Base
            var m

            var geometry = new THREE.Geometry()
            // this.mesh = new THREE.Mesh(geometry, Blocks.Base.material)
            // this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([
            //   Blocks.Base.material,
            //   Blocks.Base.material,
            //   Blocks.Base.material,
            //   Blocks.Base.material,
            //   Blocks.Base.material,
            //   Blocks.Base.material,
            //
            //   Blocks.One.material,
            //   Blocks.One.material,
            //   Blocks.One.material,
            //   Blocks.One.material,
            //   Blocks.One.material,
            //   Blocks.One.material,
            //
            //   Blocks.Two.material,
            //   Blocks.Two.material,
            //   Blocks.Two.material,
            //   Blocks.Two.material,
            //   Blocks.Two.material,
            //   Blocks.Two.material,
            // ]))
            // this.add(this.mesh)
            // this.updateMatrix()

            var merged = []
            merged.concat.apply(merged, this.data)
            console.log(Mesher.Greedy(this.data, [CHUNK_SIZE_X, CHUNK_SIZE_Y, CHUNK_SIZE_Z]))

            var result = Mesher.Greedy(this.data, [CHUNK_SIZE_X, CHUNK_SIZE_Y, CHUNK_SIZE_Z])
            geometry.vertices.length = 0;
            geometry.faces.length = 0;
            for (var i = 0; i < result.vertices.length; ++i) {
                var q = result.vertices[i];
                geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
            }
            for (var i = 0; i < result.faces.length; ++i) {
                var q = result.faces[i];
                var f = new THREE.Face3(q[0], q[1], q[2]);
                f.color = new THREE.Color(0xffaa00)//new THREE.Color(q[3]);
                // f.vertexColors = [f.color, f.color, f.color];
                geometry.faces.push(f);
            }

            geometry.computeFaceNormals();

            geometry.verticesNeedUpdate = true;
            geometry.elementsNeedUpdate = true;
            geometry.normalsNeedUpdate = true;

            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();

            var material = new THREE.MeshBasicMaterial({
                vertexColors: THREE.VertexColors
			})
			this.mesh = new THREE.Mesh(geometry, material)
            this.add(this.mesh)

            var x = 0
            var y = 0
            var z = 0
            var i = 0
            var b: Blocks.Base
            var m
            while (i < BLOCKS_PER_CHUNK) {
                if (this.data[i]) {
                    if (this.data[i] === 1)
                        b = new Blocks.Base({ x, y, z })
                    else if (this.data[i] == 2)
                        b = new Blocks.One({ x, y, z })
                    else
                        b = new Blocks.Two({ x, y, z })

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

            // while (i < BLOCKS_PER_CHUNK) {
            //     if (this.data[i]) {
            //         if (this.data[i] === 1)
            //             b = new Blocks.Base({ x, y, z })
            //         else if (this.data[i] == 2)
            //             b = new Blocks.One({ x, y, z })
            //         else
            //             b = new Blocks.Two({ x, y, z })
            //
            //         // this.add(b)
            //         // m = b.mesh.geometry.clone()
            //         // m.applyMatrix(b.matrix)
            //         this.mesh.geometry.merge(b.mesh.geometry, b.matrix, (this.data[i] - 1) * 6)
            //         this.blocks[i] = b
            //     }
            //     i++
            //
            //     z++
            //     if (z >= CHUNK_SIZE_Z) {
            //         z = 0
            //         x++
            //     }
            //     if (x >= CHUNK_SIZE_X) {
            //         x = 0
            //         y++
            //     }
            // }


        }
    }
}
