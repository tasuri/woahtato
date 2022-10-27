import config from './config.js';
import Enemy from './entities/enemy.js';
import Player from './entities/player.js';


window.onload = () => {
  "use strict";
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
  gameInit();
};


let gameCanv, ctx, player;

function gameInit() {
  gameCanv = document.getElementById('game');
  ctx = gameCanv.getContext('2d');

  player = new Player(
    config.playerSize,
    '#000000'
  );
  player.setContext = ctx;
  player.setShotRange = 70;
  player.tickRate = config.gameTick;

  setInterval(mainLoop, config.gameTick);
}

function mainLoop() {
  ctx.clearRect(0, 0, config.arenaWidth, config.arenaHeight);

  player.updatePosition(config.arenaWidth, config.arenaHeight);
  
  player.draw();
}