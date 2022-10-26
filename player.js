export default class Player {

  constructor(x, y, r, c) {

    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;

    this.maxVel = 3;
    this.size = r;
    this.color = c;

    this.ctx = undefined;
    this.shotRange = 30;
    this.tickRate = 0;

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

  set setContext(ctx) {
    if (CanvasRenderingContext2D.prototype.isPrototypeOf(ctx)) {
      this.ctx = ctx;
    } else {
      throw 'setContext(ctx): ctx is not type of CanvasRenderingContext2D';
    }
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
        if (active) {
          this.moveUp = true;
        } else {
          this.moveUp = false;
        }
        break;
      case 'ArrowDown':
      case 's':
        if (active) {
          this.moveDown = true;
        } else {
          this.moveDown = false;
        }
        break;
      case 'ArrowLeft':
      case 'a':
        if (active) {
          this.moveLeft = true;
        } else {
          this.moveLeft = false;
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (active) {
          this.moveRight = true;
        } else {
          this.moveRight = false;
        }
        break;
    }
  }

  checkMovement() {
    if(this.moveUp === true) {
      if(this.yVel > -this.maxVel) {
        this.yVel -= 1;
      }
    }
    if(this.moveDown === true) {
      if(this.yVel < this.maxVel) {
        this.yVel += 1;
      }
    }
    if(this.moveLeft === true) {
      if(this.xVel > -this.maxVel) {
        this.xVel -= 1;
      }
    }
    if(this.moveRight === true) {
      if(this.xVel < this.maxVel) {
        this.xVel += 1;
      }
    }
    if(!this.moveUp && !this.moveDown) {
      if(this.yVel > 0) {
        this.yVel -= 1;
      } else if(this.yVel < 0) {
        this.yVel += 1;
      }
    }
    if(!this.moveLeft && !this.moveRight) {
      if(this.xVel > 0) {
        this.xVel -= 1;
      } else if(this.xVel < 0) {
        this.xVel += 1;
      }
    }
  }

  updatePosition(arenaWidth, arenaHeight) {
    this.checkMovement();
    this.y = this.y + this.yVel;
    this.x = this.x + this.xVel;
    if (this.y <= 0 + this.size) {
      this.y = 0 + this.size;
    } else if(this.y >= arenaHeight - this.size) {
      this.y = arenaHeight - this.size;
    }
    if (this.x <= 0 + this.size) {
      this.x = 0 + this.size;
    } else if(this.x >= arenaWidth - this.size) {
      this.x = arenaWidth - this.size;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();
    this.drawShotRange(this.shotRange);
  }

  drawShotRange() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.fillStyle = '#ff000009';
    this.ctx.arc(this.x, this.y, this.shotRange, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

}