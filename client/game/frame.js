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
