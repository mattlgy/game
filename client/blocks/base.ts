module Blocks {
    export class Base extends THREE.Object3D {
        public static geometry = new THREE.BoxGeometry(1, 1, 1)
        public static material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })

        mesh: THREE.Mesh

        constructor({ x, y, z }) {
            super()

            this.mesh = this.makeMesh()

            this.position.x = x + 0.5
            this.position.z = z + 0.5
            this.position.y = y

            this.add(this.mesh)
        }

        private makeMesh() {
            // hack to get the curent class's static geometry and material
            var constructor: any = this.constructor
            return new THREE.Mesh(constructor.geometry, constructor.material)
        }
    }
}
