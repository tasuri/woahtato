import config from "../core/config.js";
import Entity from "./entity.js";

export default class Player extends Entity {

  constructor(r, c) {
    super('player', 0, 0);

    this.maxVel = 3;
    this.size = r;
    this.color = c;

    this.x = config.arenaWidth / 2 - this.size / 2;
    this.y = config.arenaHeight / 2 - this.size / 2;

    this.ctx = undefined;
    this.shotRange = 30;

    this.shotRangeVisual

    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;

    document.addEventListener('keyup', (e) => {
      this.moveHandler(e, false);
    });

    document.addEventListener('keydown', (e) => {
      this.moveHandler(e, true);
    });
  }

  set setShotRange(range) {
    if (range > 0) {
      this.shotRange = range;
    }
  }

  moveHandler(e, active) {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (active && !this.moveUp) {
          this.moveUp = true;
        } else if (!active) {
          this.moveUp = false;
        }
        break;
      case 'ArrowDown':
      case 's':
        if (active && !this.moveDown) {
          this.moveDown = true;
        } else if (!active) {
          this.moveDown = false;
        }
        break;
      case 'ArrowLeft':
      case 'a':
        if (active && !this.moveLeft) {
          this.moveLeft = true;
        } else if (!active) {
          this.moveLeft = false;
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (active && !this.moveRight) {
          this.moveRight = true;
        } else if (!active) {
          this.moveRight = false;
        }
        break;
    }
  }

  checkMovement() {
    if (!(this.moveUp && this.moveDown)) {
      if (this.moveUp === true) {
        if (this.yVel > -this.maxVel) {
          this.yVel -= 1;
        }
      } else if (this.moveDown === true) {
        if (this.yVel < this.maxVel) {
          this.yVel += 1;
        }
      }
    }

    if (!(this.moveLeft && this.moveRight)) {
      if (this.moveLeft === true) {
        if (this.xVel > -this.maxVel) {
          this.xVel -= 1;
        }
      } else if (this.moveRight === true) {
        if (this.xVel < this.maxVel) {
          this.xVel += 1;
        }
      }
    }


    if (!this.moveUp && !this.moveDown) {
      if (this.yVel > 0) {
        this.yVel -= 1;
      } else if (this.yVel < 0) {
        this.yVel += 1;
      }
    }
    if (!this.moveLeft && !this.moveRight) {
      if (this.xVel > 0) {
        this.xVel -= 1;
      } else if (this.xVel < 0) {
        this.xVel += 1;
      }
    }
  }

  updatePosition(arenaWidth, arenaHeight) {
    this.checkMovement();
    if(config.arenaWidth > (this.x + this.size + this.xVel) && 0 < (this.x - this.size + this.xVel)) {
      this.x = this.x + this.xVel;
    }
    if(config.arenaHeight > (this.y + this.size + this.yVel) && 0 < (this.y - this.size + this.yVel)) {
      this.y = this.y + this.yVel;
    }
    
  }

  detectEnemiesInRange(enemy) {

    if (Math.sqrt(((enemy.x - this.x) * (enemy.x - this.x)) + ((enemy.y - this.y) * (enemy.y - this.y))) <= this.shotRange + enemy.size) {
      enemy.setInRange = true;
      console.log('in Range')
    } else {
      enemy.setInRange = false;
      console.log('not in Range')
    }
  }

}