var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    Game.CHUNK_SIZE_X = 4;
    Game.CHUNK_SIZE_Y = 8;
    Game.CHUNK_SIZE_Z = 4;
    Game.BLOCKS_PER_CHUNK = Game.CHUNK_SIZE_X * Game.CHUNK_SIZE_Y * Game.CHUNK_SIZE_Z;
    var Chunk = (function (_super) {
        __extends(Chunk, _super);
        function Chunk(_a) {
            var data = _a.data, x = _a.x, z = _a.z;
            _super.call(this);
            this.blocks = [];
            this.x = 0;
            this.z = 0;
            this.data = data;
            this.x = x;
            this.z = z;
            this.position.x = x * Game.CHUNK_SIZE_X;
            this.position.z = z * Game.CHUNK_SIZE_Z;
        }
        Chunk.prototype.getBlock = function (x, y, z) {
            x = Math.floor(x);
            z = Math.floor(z);
            y = Math.floor(y);
            // var i = z + x * CHUNK_SIZE_X + y * CHUNK_SIZE_Y
            // var i = z + CHUNK_SIZE_X * (x + CHUNK_SIZE_Y * y)
            var i = z + (x * Game.CHUNK_SIZE_X) + (y * Game.CHUNK_SIZE_X * Game.CHUNK_SIZE_Z);
            return this.blocks[i]; // this.data[i] != undefined ? this.data[i] : null
        };
        Chunk.prototype.getBlockWorldCoords = function (x, y, z) {
            return this.getBlock(x % Game.CHUNK_SIZE_X, y, z % Game.CHUNK_SIZE_Z);
        };
        Chunk.prototype.render = function () {
            var x = 0;
            var y = 0;
            var z = 0;
            var i = 0;
            var b;
            while (i < Game.BLOCKS_PER_CHUNK) {
                if (this.data[i]) {
                    b = new Blocks.Base({ x: x, y: y, z: z });
                    this.add(b);
                    this.blocks[i] = b;
                }
                i++;
                z++;
                if (z >= Game.CHUNK_SIZE_Z) {
                    z = 0;
                    x++;
                }
                if (x >= Game.CHUNK_SIZE_X) {
                    x = 0;
                    y++;
                }
            }
        };
        return Chunk;
    })(THREE.Object3D);
    Game.Chunk = Chunk;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Frame = (function () {
        function Frame(_a) {
            var delta = _a.delta;
            this.delta = 0;
            this.delta = delta;
        }
        return Frame;
    })();
    Game.Frame = Frame;
})(Game || (Game = {}));
var Game;
(function (Game) {
    function getPointerLock() {
        // http://www.html5rocks.com/en/tutorials/pointerlock/intro/
        var havePointerLock = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;
        if (havePointerLock) {
            var element = document.body;
            var pointerlockchange = function (event) {
                if (document.pointerLockElement === element /*|| document.mozPointerLockElement === element || document.webkitPointerLockElement === element*/) {
                }
                else {
                }
            };
            var pointerlockerror = function (event) {
                // instructions.style.display = '';
            };
            // Hook pointer lock state change events
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
            document.addEventListener('pointerlockerror', pointerlockerror, false);
            document.addEventListener('mozpointerlockerror', pointerlockerror, false);
            document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
            document.body.addEventListener('click', function (event) {
                // instructions.style.display = 'none';
                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock /*|| element.mozRequestPointerLock || element.webkitRequestPointerLock*/;
                if (/Firefox/i.test(navigator.userAgent)) {
                    var fullscreenchange = function (event) {
                        if (document.fullscreenElement === element /*|| document.mozFullscreenElement === element || document.mozFullScreenElement === element*/) {
                            document.removeEventListener('fullscreenchange', fullscreenchange);
                            document.removeEventListener('mozfullscreenchange', fullscreenchange);
                            element.requestPointerLock();
                        }
                    };
                    document.addEventListener('fullscreenchange', fullscreenchange, false);
                    document.addEventListener('mozfullscreenchange', fullscreenchange, false);
                    element.requestFullscreen = element.requestFullscreen /*|| element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen*/;
                    element.requestFullscreen();
                }
                else {
                    element.requestPointerLock();
                }
            }, false);
        }
        else {
            document.body.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
        }
    }
    Game.getPointerLock = getPointerLock;
})(Game || (Game = {}));
var shiftAmount = 8;
var Game;
(function (Game) {
    var World = (function () {
        function World() {
            this.chunks = {};
        }
        World.prototype.hashChunkCoords = function (x, z) {
            return x + ',' + z;
        };
        World.prototype.newChunk = function (x, z, data) {
            var i = this.hashChunkCoords(x, z); // (x << shiftAmount) + z
            this.chunks[i] = new Game.Chunk({ x: x, z: z, data: data });
            return this.chunks[i];
        };
        World.prototype.getChunk = function (x, z) {
            var i = this.hashChunkCoords(x, z); // (x << shiftAmount) + z
            return this.chunks[i];
        };
        World.prototype.getChunkWorldCoords = function (x, z) {
            x = Math.floor(x / Game.CHUNK_SIZE_X);
            z = Math.floor(z / Game.CHUNK_SIZE_Z);
            return this.getChunk(x, z);
        };
        World.prototype.getBlock = function (x, y, z) {
            var chunk = this.getChunkWorldCoords(x, z);
            if (!chunk)
                return null;
            return chunk.getBlockWorldCoords(x, y, z);
        };
        return World;
    })();
    Game.World = World;
})(Game || (Game = {}));
var _worldData = [];
var Game;
(function (Game) {
    Game.worldData = _worldData;
})(Game || (Game = {}));
_worldData[0] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[1] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[2] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[3] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[4] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
]; // ]
_worldData[5] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[6] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[7] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
_worldData[8] = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
var Blocks;
(function (Blocks) {
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base(_a) {
            var x = _a.x, y = _a.y, z = _a.z;
            _super.call(this);
            this.mesh = this.makeMesh();
            this.position.x = x + 0.5;
            this.position.z = z + 0.5;
            this.position.y = y;
            this.add(this.mesh);
        }
        Base.prototype.makeMesh = function () {
            // hack to get the curent class's static geometry and material
            var constructor = this.constructor;
            return new THREE.Mesh(constructor.geometry, constructor.material);
        };
        Base.geometry = new THREE.BoxGeometry(1, 1, 1);
        Base.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        return Base;
    })(THREE.Object3D);
    Blocks.Base = Base;
})(Blocks || (Blocks = {}));
// var dxp = new THREE.Vector3(1, 0, 0)
// var dxn = new THREE.Vector3(-1, 0, 0)
// var dyp = new THREE.Vector3(0, 1, 0)
// var dyn = new THREE.Vector3(0, -1, 0)
// var dzp = new THREE.Vector3(0, 0, 1)
// var dzn = new THREE.Vector3(0, 0, -1)
var Entities;
(function (Entities) {
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base(_a) {
            var world = _a.world;
            _super.call(this);
            this.speed = 0;
            this.size = 0;
            this.world = world;
            this.velocity = new THREE.Vector3();
        }
        Base.prototype.canExistHere = function (p) {
            var b = this.world.getBlock(p.x, p.y, p.z);
            return !b;
        };
        Base.prototype.canExistRelavtive = function (d) {
            return this.canExistHere(this.position.clone().add(d));
        };
        Base.prototype.getChunk = function () {
            var x = Math.floor(this.position.x / Game.CHUNK_SIZE_X);
            var z = Math.floor(this.position.z / Game.CHUNK_SIZE_Z);
            return this.world.getChunk(x, z);
        };
        Base.prototype.move = function (frame) {
            if (!this.canExistRelavtive(new THREE.Vector3(0, this.velocity.y * frame.delta, 0))) {
                this.velocity.y = 0;
            }
            this.position.y = this.position.y + this.velocity.y * frame.delta;
            if (!this.canExistRelavtive(new THREE.Vector3(this.velocity.x * frame.delta, 0, 0))) {
                if (this.canExistRelavtive(new THREE.Vector3(this.velocity.x * frame.delta, 1, 0)))
                    this.position.y = this.position.y + 1;
                else
                    this.velocity.x = 0;
            }
            this.position.x = this.position.x + this.velocity.x * frame.delta;
            if (!this.canExistRelavtive(new THREE.Vector3(0, 0, this.velocity.z * frame.delta))) {
                if (this.canExistRelavtive(new THREE.Vector3(0, 1, this.velocity.z * frame.delta)))
                    this.position.y = this.position.y + 1;
                else
                    this.velocity.z = 0;
            }
            this.position.z = this.position.z + this.velocity.z * frame.delta;
        };
        return Base;
    })(THREE.Object3D);
    Entities.Base = Base;
})(Entities || (Entities = {}));
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
var Entities;
(function (Entities) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(_a) {
            var _this = this;
            var camera = _a.camera, world = _a.world;
            _super.call(this, { world: world });
            this.size = 4;
            this.speed = 1.5;
            //
            // CAMERA
            //
            this.cameraObject = new THREE.Object3D();
            this.cameraObject.position.y = 3;
            this.cameraObject.add(camera);
            this.add(this.cameraObject);
            //
            // LIGHTING
            //
            // create a point light
            this.pointLight = new THREE.PointLight(0xFFFFFF);
            // set its position
            // this.pointLight.position.x = 10;
            this.pointLight.position.y = 3;
            // this.pointLight.position.z = 130;
            // add to the scene
            this.add(this.pointLight);
            //
            // MOUSE
            //
            var PI_2 = Math.PI / 2;
            document.addEventListener('mousemove', function (event) {
                var movementX = event.movementX; // || event.mozMovementX || event.webkitMovementX || 0
                var movementY = event.movementY; // || event.mozMovementY || event.webkitMovementY || 0
                _this.rotation.y -= movementX * 0.002;
                _this.cameraObject.rotation.x -= movementY * 0.002;
                _this.cameraObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, _this.cameraObject.rotation.x));
            }, false);
            //
            // Keyboard
            //
            this.movingForward = false;
            this.movingBackward = false;
            this.movingLeft = false;
            this.movingRight = false;
            this.movingUp = false;
            this.movingDown = false;
            document.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                    case 38: // up
                    case 87:
                        _this.movingForward = true;
                        break;
                    case 37: // left
                    case 65:
                        _this.movingLeft = true;
                        break;
                    case 40: // down
                    case 83:
                        _this.movingBackward = true;
                        break;
                    case 39: // right
                    case 68:
                        _this.movingRight = true;
                        break;
                    case 32:
                        _this.movingUp = true;
                        break;
                    case 16:
                        _this.movingDown = true;
                        break;
                }
            }, false);
            document.addEventListener('keyup', function (event) {
                switch (event.keyCode) {
                    case 38: // up
                    case 87:
                        _this.movingForward = false;
                        break;
                    case 37: // left
                    case 65:
                        _this.movingLeft = false;
                        break;
                    case 40: // down
                    case 83:
                        _this.movingBackward = false;
                        break;
                    case 39: // right
                    case 68:
                        _this.movingRight = false;
                        break;
                    case 32:
                        _this.movingUp = false;
                        break;
                    case 16:
                        _this.movingDown = false;
                        break;
                }
            }, false);
        }
        Player.prototype.tick = function (frame) {
            this.velocity.x -= this.velocity.x * 10.0 * frame.delta;
            this.velocity.y -= this.velocity.y * 10.0 * frame.delta;
            this.velocity.z -= this.velocity.z * 10.0 * frame.delta;
            this.velocity.y -= 2.3; // 100.0 = mass
            var dir = new THREE.Vector3();
            if (this.movingForward)
                dir.z -= 1;
            if (this.movingBackward)
                dir.z += 1;
            if (this.movingLeft)
                dir.x -= 1;
            if (this.movingRight)
                dir.x += 1;
            if (this.movingUp && !this.canExistRelavtive(new THREE.Vector3(0, -0.5, 0)))
                this.velocity.y += 40;
            // if (this.movingDown) dir.y -= 1
            dir.normalize().applyEuler(this.rotation).multiplyScalar(this.speed);
            this.velocity.add(dir);
            if (Math.abs(this.velocity.x) < 0.01)
                this.velocity.x = 0;
            if (Math.abs(this.velocity.y) < 0.01)
                this.velocity.y = 0;
            if (Math.abs(this.velocity.z) < 0.01)
                this.velocity.z = 0;
            this.move(frame);
        };
        return Player;
    })(Entities.Base);
    Entities.Player = Player;
})(Entities || (Entities = {}));
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
var LOAD_RAIDUS = 3;
var scene = new THREE.Scene();
var world = new Game.World();
// window.world = world
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5
var player = new Entities.Player({ camera: camera, world: world });
// window.player = player
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
