import THREE from 'three'

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })

export default class Block extends THREE.Object3D {
  constructor ({ x, y, z }) {
    super()

    this.mesh = new THREE.Mesh(geometry, material)

    this.position.x = x + 0.5
    this.position.z = z + 0.5
    this.position.y = y

    this.add(this.mesh)
  }
}
