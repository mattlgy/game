import THREE from 'three'

var dxp = new THREE.Vector3(1, 0, 0)
var dxn = new THREE.Vector3(-1, 0, 0)
var dyp = new THREE.Vector3(0, 1, 0)
var dyn = new THREE.Vector3(0, -1, 0)
var dzp = new THREE.Vector3(0, 0, 1)
var dzn = new THREE.Vector3(0, 0, -1)

export default class Entity extends THREE.Object3D {
  constructor ({ world }) {
    super()

    this.world = world

    this.speed = 1.5
    this.size = .5

    this.velocity = new THREE.Vector3()
    this.caster = new THREE.Raycaster()
  }

  collisions () {
    if (this.world.getBlock(this.position.x, this.position.y + this.velocity.y, this.position.z)) {
      this.velocity.y = 0
    }

    if (this.world.getBlock(this.position.x + this.velocity.x, this.position.y, this.position.z)) {
      this.velocity.x = 0
    }

    if (this.world.getBlock(this.position.x, this.position.y, this.position.z + this.velocity.z)) {
      this.velocity.z = 0
    }
  }
}

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
