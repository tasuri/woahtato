import config from './config.js';
import Player from './player.js';


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
    gameCanv.offsetWidth/2-config.playerSize/2,
    gameCanv.offsetHeight/2-config.playerSize/2,
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