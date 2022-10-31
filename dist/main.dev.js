"use strict";

var _config = _interopRequireDefault(require("./config.js"));

var _enemy = _interopRequireDefault(require("./entities/enemy.js"));

var _player = _interopRequireDefault(require("./entities/player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

"use strict";

window.onload = function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }

  gameInit();
};

var gameCanv, ctx, player, enemy;

function gameInit() {
  gameCanv = document.getElementById('game');
  ctx = gameCanv.getContext('2d');
  player = new _player["default"](_config["default"].playerSize, '#0000ff');
  player.setContext = ctx;
  player.setShotRange = 700;
  player.tickRate = _config["default"].gameTick;
  enemy = new _enemy["default"]("test");
  enemy.setContext = ctx;
  setInterval(mainLoop, _config["default"].gameTick);
}

function mainLoop() {
  ctx.clearRect(0, 0, _config["default"].arenaWidth, _config["default"].arenaHeight);
  player.updatePosition(_config["default"].arenaWidth, _config["default"].arenaHeight);
  player.detectEnemiesInRange(enemy);
  enemy.draw();
  player.draw();
}