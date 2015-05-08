/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./game/index"/>
/// <reference path="./blocks/index"/>
/// <reference path="./entities/index"/>
var websocket = new WebSocket('ws://localhost:12345/echo');
websocket.binaryType = "arraybuffer";
websocket.onopen = function (event) {
    var buffer = new ArrayBuffer(8);
    var arr = new Int32Array(buffer);
    arr[0] = 13;
    arr[1] = 42;
    websocket.send(arr);
};
websocket.onmessage = function (event) {
    console.log(event);
    console.log(event.data);
    console.log(new Int32Array(event.data));
};
Game.getPointerLock();
var CHUNK_SIZE_X = 4;
var CHUNK_SIZE_Y = 8;
var CHUNK_SIZE_Z = 4;
var BLOCKS_PER_CHUNK = CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z;
var LOAD_RAIDUS = 15;
var scene = new THREE.Scene();
var world = new Game.World();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var player = new Entities.Player({ camera: camera, world: world });
player.position.x = 2;
player.position.y = 8;
player.position.z = 2;
scene.add(player);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function loadChunks() {
    var c = player.getChunk();
    var x = c.x;
    var z = c.z;
    var xMin = x - LOAD_RAIDUS;
    var zMin = z - LOAD_RAIDUS;
    var xMax = x + LOAD_RAIDUS;
    var zMax = z + LOAD_RAIDUS;
    x = xMin;
    z = zMin;
    while (x <= xMax) {
        while (z <= zMax) {
            c = world.getChunk(x, z);
            if (!c) {
                c = world.newChunk(x, z, getChunkData(x, z));
                scene.add(c);
                c.render();
            }
            z++;
        }
        z = zMin;
        x++;
    }
}
function getChunkData(x, z) {
    return Game.worldData[5];
}
var i = 0;
var x = 0;
var z = 0;
var chunk;
while (i < 9) {
    chunk = world.newChunk(x, z, Game.worldData[i]);
    scene.add(chunk);
    chunk.render();
    i++;
    x++;
    if (x >= 3) {
        x = 0;
        z++;
    }
}
var past = performance.now();
function onFrame(timestamp) {
    var now = performance.now();
    var delta = (now - past) / 1000;
    player.tick(new Game.Frame({ delta: delta }));
    loadChunks();
    renderer.render(scene, camera);
    past = now;
    requestAnimationFrame(onFrame);
}
requestAnimationFrame(onFrame);
