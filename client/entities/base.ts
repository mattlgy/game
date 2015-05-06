// var dxp = new THREE.Vector3(1, 0, 0)
// var dxn = new THREE.Vector3(-1, 0, 0)
// var dyp = new THREE.Vector3(0, 1, 0)
// var dyn = new THREE.Vector3(0, -1, 0)
// var dzp = new THREE.Vector3(0, 0, 1)
// var dzn = new THREE.Vector3(0, 0, -1)

module Entities {
    export class Base extends THREE.Object3D {

        world: Game.World

        speed: number = 0
        size: number = 0
        velocity: THREE.Vector3

        constructor({ world }) {
            super()

            this.world = world

            this.velocity = new THREE.Vector3()
        }

        public canExistHere(p: THREE.Vector3): boolean {
            return !this.world.getBlock(p.x, p.y, p.z)
        }
        public canExistRelavtive(d: THREE.Vector3): boolean {
            return this.canExistHere(this.position.clone().add(d))
        }

        public move(frame: Game.Frame) {
            if (!this.canExistRelavtive(new THREE.Vector3(0, this.velocity.y * frame.delta, 0))) {
                this.velocity.y = 0
            }
            this.position.y = this.position.y + this.velocity.y * frame.delta

            if (!this.canExistRelavtive(new THREE.Vector3(this.velocity.x * frame.delta, 0, 0))) {
                if (this.canExistRelavtive(new THREE.Vector3(this.velocity.x * frame.delta, 1, 0)))
                    this.position.y = this.position.y + 1
                else
                    this.velocity.x = 0
            }
            this.position.x = this.position.x + this.velocity.x * frame.delta

            if (!this.canExistRelavtive(new THREE.Vector3(0, 0, this.velocity.z * frame.delta))) {
                if (this.canExistRelavtive(new THREE.Vector3(0, 1, this.velocity.z * frame.delta)))
                    this.position.y = this.position.y + 1
                else
                    this.velocity.z = 0
            }
            this.position.z = this.position.z + this.velocity.z * frame.delta
        }
    }
}

// export default class Entity extends THREE.Object3D {
//   constructor ({ world }) {
//     super()
//
//     this.world = world
//
//     this.speed = 1.5
//     this.size = .5
//
//     this.velocity = new THREE.Vector3()
//     this.caster = new THREE.Raycaster()
//   }
//
//   isRelativeBlockSolid(d) {
//     var dx = d.x || 0
//     var dy = d.y || 0
//     var dz = d.z || 0
//     return !!this.world.getBlock(this.position.x + dx, this.position.y + dy, this.position.z + dz)
//   }
//
//   move (frame) {
//     if (this.isRelativeBlockSolid({ y: this.velocity.y * frame.delta})) {
//       this.velocity.y = 0
//     }
//     this.position.y = this.position.y + this.velocity.y * frame.delta
//
//     if (this.isRelativeBlockSolid({ x: this.velocity.x * frame.delta})) {
//       if (!this.world.getBlock(this.position.x + this.velocity.x * frame.delta, this.position.y + 1, this.position.z))
//         this.position.y = this.position.y + 1
//       else
//         this.velocity.x = 0
//     }
//     this.position.x = this.position.x + this.velocity.x * frame.delta
//
//     if (this.isRelativeBlockSolid({ z: this.velocity.z * frame.delta})) {
//       if (!this.world.getBlock(this.position.x, this.position.y + 1, this.position.z + this.velocity.z * frame.delta))
//         this.position.y = this.position.y + 1
//       else
//         this.velocity.z = 0
//     }
//     this.position.z = this.position.z + this.velocity.z * frame.delta
//   }
// }

// old code bouncy bouncy
// collisions () {
//   var direction = this.velocity.clone().normalize()
//
//   if (direction.x > 0) {
//     this.caster.set(this.position, dxp)
//     if (this.caster.intersectObjects(this.blocks, true)) {
//
//     }
//   }
//
//   var intersections
//   var distance
//   var u, w, n, v
//
//   this.caster.set(this.position, direction)
//
//   intersections = this.caster.intersectObjects(this.blocks, true)
//
//   if (intersections.length && intersections[0].point.distanceTo(this.position) < this.size) {
//     v = this.velocity
//     n = intersections[0].face.normal
//     u = n.clone().multiplyScalar(v.dot(n))
//     w = v.clone().sub(u)
//     this.velocity = w.sub(u)
//   }
// }
