import THREE from 'three'
import Entity from './entity'
import Player from './player'
import Block from './block'
import World from './world'
import Chunk from './chunk'

import worldData from './world-data'


var websocket = new WebSocket('ws://localhost:12345/echo')
websocket.binaryType = "arraybuffer"
websocket.onopen = function(event) {
  var buffer = new ArrayBuffer(8)
  var arr = new Int32Array(buffer)
  arr[0] = 13
  arr[1] = 42
  // console.log(arr)
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

// var blocks = []
// window.blocks = blocks

var scene = new THREE.Scene()
var world = new World({})
window.world = world

// // create a point light
// var pointLight = new THREE.PointLight(0xFFFFFF)
// // set its position
// pointLight.position.x = 10
// pointLight.position.y = 50
// pointLight.position.z = 130
// // add to the scene
// scene.add(pointLight)

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// camera.position.z = 5
var player = new Player({ camera, world })
window.player = player
player.position.x = 2
player.position.y = 4
player.position.z = 2
scene.add(player)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

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



function getPointerLock () {
  // http://www.html5rocks.com/en/tutorials/pointerlock/intro/
	var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document

	if (havePointerLock) {
		var element = document.body

		var pointerlockchange = function ( event ) {
			if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
				// controlsEnabled = true;
				// controls.enabled = true;
        //
				// blocker.style.display = 'none';
			} else {
				// controls.enabled = false;
        //
				// blocker.style.display = '-webkit-box';
				// blocker.style.display = '-moz-box';
				// blocker.style.display = 'box';
        //
				// instructions.style.display = '';
			}
		}

		var pointerlockerror = function ( event ) {
			instructions.style.display = '';
		}

		// Hook pointer lock state change events
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

		document.body.addEventListener( 'click', function ( event ) {
			// instructions.style.display = 'none';

			// Ask the browser to lock the pointer
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

			if ( /Firefox/i.test( navigator.userAgent ) ) {
				var fullscreenchange = function ( event ) {
					if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
						document.removeEventListener( 'fullscreenchange', fullscreenchange );
						document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

						element.requestPointerLock();
					}

				}

				document.addEventListener( 'fullscreenchange', fullscreenchange, false );
				document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

				element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

				element.requestFullscreen();
			} else {
				element.requestPointerLock();
			}
		}, false );
	} else {
		document.body.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

	}
}
