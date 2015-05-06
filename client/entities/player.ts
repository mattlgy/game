
module Entities {
    export class Player extends Base {

        size = 4
        speed = 1.5

        cameraObject: THREE.Object3D
        pointLight: THREE.PointLight

        movingForward: boolean
        movingBackward: boolean
        movingLeft: boolean
        movingRight: boolean
        movingUp: boolean
        movingDown: boolean

        constructor({ camera, world }) {
            super({ world })

            //
            // CAMERA
            //

            this.cameraObject = new THREE.Object3D()
            this.cameraObject.position.y = 3
            this.cameraObject.add(camera)
            this.add(this.cameraObject)

            //
            // LIGHTING
            //

            // create a point light
            this.pointLight = new THREE.PointLight(0xFFFFFF)
            // set its position
            // this.pointLight.position.x = 10;
            this.pointLight.position.y = 3
            // this.pointLight.position.z = 130;
            // add to the scene
            this.add(this.pointLight)

            //
            // MOUSE
            //

            var PI_2 = Math.PI / 2
            document.addEventListener('mousemove', (event) => {
                var movementX = event.movementX // || event.mozMovementX || event.webkitMovementX || 0
                var movementY = event.movementY // || event.mozMovementY || event.webkitMovementY || 0

                this.rotation.y -= movementX * 0.002
                this.cameraObject.rotation.x -= movementY * 0.002

                this.cameraObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.cameraObject.rotation.x))

            }, false)

            //
            // Keyboard
            //

            this.movingForward = false
            this.movingBackward = false
            this.movingLeft = false
            this.movingRight = false
            this.movingUp = false
            this.movingDown = false

            document.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case 38: // up
                    case 87: // w
                        this.movingForward = true
                        break

                    case 37: // left
                    case 65: // a
                        this.movingLeft = true
                        break

                    case 40: // down
                    case 83: // s
                        this.movingBackward = true
                        break

                    case 39: // right
                    case 68: // d
                        this.movingRight = true
                        break

                    case 32: // space
                        this.movingUp = true
                        break

                    case 16: // left shift
                        this.movingDown = true
                        break
                }
            }, false)


            document.addEventListener('keyup', (event) => {
                switch (event.keyCode) {
                    case 38: // up
                    case 87: // w
                        this.movingForward = false
                        break

                    case 37: // left
                    case 65: // a
                        this.movingLeft = false
                        break

                    case 40: // down
                    case 83: // s
                        this.movingBackward = false
                        break

                    case 39: // right
                    case 68: // d
                        this.movingRight = false
                        break

                    case 32: // space
                        this.movingUp = false
                        break

                    case 16: // left shift
                        this.movingDown = false
                        break
                }
            }, false)
        }

        tick(frame: Game.Frame) {
            this.velocity.x -= this.velocity.x * 10.0 * frame.delta
            this.velocity.y -= this.velocity.y * 10.0 * frame.delta
            this.velocity.z -= this.velocity.z * 10.0 * frame.delta
            this.velocity.y -= 2.3 // 100.0 = mass

            var dir = new THREE.Vector3()

            if (this.movingForward) dir.z -= 1
            if (this.movingBackward) dir.z += 1

            if (this.movingLeft) dir.x -= 1
            if (this.movingRight) dir.x += 1

            if (this.movingUp && !this.canExistRelavtive(new THREE.Vector3(0, -0.5, 0))) this.velocity.y += 40
            // if (this.movingDown) dir.y -= 1

            dir.normalize().applyEuler(this.rotation).multiplyScalar(this.speed)

            this.velocity.add(dir)

            if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0
            if (Math.abs(this.velocity.y) < 0.01) this.velocity.y = 0
            if (Math.abs(this.velocity.z) < 0.01) this.velocity.z = 0

            this.move(frame)
        }
    }
}

/*
export default class Player extends Entity {
  constructor ({ camera, world }) {
    super({ world })

    //
    // CAMERA
    //

    this.cameraObject = new THREE.Object3D()
    this.cameraObject.position.y = 3
    this.cameraObject.add(camera)
  	this.add(this.cameraObject)

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

    var PI_2 = Math.PI / 2
    document.addEventListener('mousemove', (event) => {
  		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
  		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

  		this.rotation.y -= movementX * 0.002
  		this.cameraObject.rotation.x -= movementY * 0.002

  		this.cameraObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.cameraObject.rotation.x))

  	}, false)

    //
    // Keyboard
    //

    this.movingForward = false
		this.movingBackward = false
		this.movingLeft = false
		this.movingRight = false
    this.movingUp = false
    this.moviningDown = false

		document.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
				case 38: // up
				case 87: // w
					this.movingForward = true
					break

				case 37: // left
				case 65: // a
					this.movingLeft = true
          break

				case 40: // down
				case 83: // s
					this.movingBackward = true
					break

				case 39: // right
				case 68: // d
					this.movingRight = true
					break

				case 32: // space
					this.movingUp = true
					break

        case 16: // left shift
					this.movingDown = true
					break
			}
		}, false)


	  document.addEventListener('keyup', (event) => {
      switch( event.keyCode ) {
        case 38: // up
        case 87: // w
          this.movingForward = false
          break

        case 37: // left
        case 65: // a
          this.movingLeft = false
          break

        case 40: // down
        case 83: // s
          this.movingBackward = false
          break

        case 39: // right
        case 68: // d
          this.movingRight = false
          break

        case 32: // space
          this.movingUp = false
          break

        case 16: // left shift
          this.movingDown = false
          break
      }
    }, false)
  }

  tick (frame) {
    // console.log(this.position.x + ', ' + this.position.y + ', ' + this.position.z)

    this.velocity.x -= this.velocity.x * 10.0 * frame.delta
		this.velocity.y -= this.velocity.y * 10.0 * frame.delta
		this.velocity.z -= this.velocity.z * 10.0 * frame.delta
		this.velocity.y -= 2.3 // 100.0 = mass

    var dir = new THREE.Vector3()

    if (this.movingForward) dir.z -= 1
		if (this.movingBackward) dir.z += 1

		if (this.movingLeft) dir.x -= 1
		if (this.movingRight) dir.x += 1

    if (this.movingUp && this.isRelativeBlockSolid({ y: -0.5})) this.velocity.y += 40
		// if (this.movingDown) dir.y -= 1

    dir.normalize().applyEuler(this.rotation).multiplyScalar(this.speed)

    this.velocity.add(dir)

    if (Math.abs(this.velocity.x) < 0.01) this.velocity.x = 0
    if (Math.abs(this.velocity.y) < 0.01) this.velocity.y = 0
    if (Math.abs(this.velocity.z) < 0.01) this.velocity.z = 0

    this.move(frame)
  }
}
*/
