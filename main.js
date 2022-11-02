import config from './core/config.js';
import View from './visual/view.js';
import Enemy from './entities/enemy.js';
import Player from './entities/player.js';

"use strict";

window.onload = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
  gameInit();
};


let gameCanv, ctx, player, enemy;

function gameInit() {
  gameCanv = document.getElementById('game');
  ctx = gameCanv.getContext('2d');

  player = new Player(
    config.playerSize,
    '#000000'
  );
  player.setContext = ctx;
  player.setShotRange = 150;
  enemy = new Enemy("test");
  enemy.setContext = ctx;

  setInterval(mainLoop, config.gameTick);
}



function mainLoop() {
  ctx.clearRect(0, 0, config.arenaWidth, config.arenaHeight);
  player.updatePosition(config.arenaWidth, config.arenaHeight);
  player.detectEnemiesInRange(enemy);

  //@Todo spawner();

  /**
   * function SecsToTicks(secs){
   *   return secs * 60;
   * }
   * 
   * function TicksToSecs(ticks){
   *   return ticks / 60;
   * }
   * 
   * 
   * global WaveTickLength = secsToTicks(30);
   * 
   * function spawner(){
   *   totalMobs = loopDurchEnemies[level]  (45)
   *   
   *   toSpawn = totalMobs / WaveLength = 1.5
   * 
   *   fullMobCount += toSpawn % 1
   * }
   */

  View.testEnemy(enemy.ctx, enemy.x, enemy.y, 15, '#ff0000')
  View.player(player.ctx, player.x, player.y, player.size, '#00ff00', player.shotRange);
}