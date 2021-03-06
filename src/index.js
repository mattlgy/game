import THREE from 'three'
import Entity from './entity'
import Player from './player'
import Block from './block'
import World from './world'
import Chunk from './chunk'

import getPointerLock from './get-pointer-lock'

import worldData from './world-data'


var websocket = new WebSocket('ws://localhost:12345/echo')
websocket.binaryType = "arraybuffer"
websocket.onopen = function(event) {
  var buffer = new ArrayBuffer(8)
  var arr = new Int32Array(buffer)
  arr[0] = 13
  arr[1] = 42
  websocket.send(arr)
}
websocket.onmessage = function(event) {
  console.log(event)
  console.log(event.data)
  console.log(new Int32Array(event.data))
}

getPointerLock()

var CHUNK_SIZE_X = 4
var CHUNK_SIZE_Y = 8
var CHUNK_SIZE_Z = 4
var BLOCKS_PER_CHUNK = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z

var scene = new THREE.Scene()
var world = new World({})
window.world = world

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// camera.position.z = 5
var player = new Player({ camera, world })
window.player = player
player.position.x = 2
player.position.y = 8
player.position.z = 2
scene.add(player)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


function getChunk (x, z) {
  
}

var i = 0
var x = 0
var z = 0
var chunk
while (i < 9) {
  chunk = world.newChunk(x, z, worldData[i])
  scene.add(chunk)
  chunk.render()

  i++
  x++
  if (x >= 3) {
    x = 0
    z++
  }
}

var past = performance.now()
function onFrame (timestamp) {
  var now = performance.now()
  var delta = ( now - past ) / 1000

  player.tick({
    delta
  })

  renderer.render(scene, camera)
  past = now
  requestAnimationFrame(onFrame)
}
requestAnimationFrame(onFrame)
