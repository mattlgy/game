var Game;
(function (Game) {
    function getPointerLock() {
        var havePointerLock = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;
        if (havePointerLock) {
            var element = document.body;
            var pointerlockchange = function (event) {
                if (document.pointerLockElement === element) {
                }
                else {
                }
            };
            var pointerlockerror = function (event) {
            };
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
            document.addEventListener('pointerlockerror', pointerlockerror, false);
            document.addEventListener('mozpointerlockerror', pointerlockerror, false);
            document.addEventListener('webkitpointerlockerror', pointerlockerror, false);
            document.body.addEventListener('click', function (event) {
                // instructions.style.display = 'none';
                element.requestPointerLock = element.requestPointerLock;
                if (/Firefox/i.test(navigator.userAgent)) {
                    var fullscreenchange = function (event) {
                        if (document.fullscreenElement === element) {
                            document.removeEventListener('fullscreenchange', fullscreenchange);
                            document.removeEventListener('mozfullscreenchange', fullscreenchange);
                            element.requestPointerLock();
                        }
                    };
                    document.addEventListener('fullscreenchange', fullscreenchange, false);
                    document.addEventListener('mozfullscreenchange', fullscreenchange, false);
                    element.requestFullscreen = element.requestFullscreen;
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
