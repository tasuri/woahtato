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
          if (this.yVel > -this.maxVel) {
            this.yVel -= 0.5;
          }
        } else {
          this.decayYVelocity()
        }
        break;
      case 'ArrowDown':
      case 's':
        if (active) {
          if (this.yVel < this.maxVel) {
            this.yVel += 0.5;
          }
        } else {
          this.decayYVelocity()
        }
        break;
      case 'ArrowLeft':
      case 'a':
        if (active) {
          if (this.xVel > -this.maxVel) {
            this.xVel -= 0.5;
          }
        } else {
          this.decayXVelocity()
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (active) {
          if (this.xVel < this.maxVel) {
            this.xVel += 0.5;
          }
        } else {
          this.decayXVelocity()
        }
        break;
    }
  }

  decayYVelocity() {
    const handler = setInterval(() => {
      if (this.yVel > 0) {
        this.yVel -= 0.1;
      } else {
        this.yVel += 0.1;
      }
      if (this.yVel === 0) {
        clearInterval(handler);
      }
    }, 50);
  }

  decayXVelocity() {
    const handler = setInterval(() => {
      if (this.xVel > 0) {
        this.xVel -= 0.5;
      } else {
        this.xVel += 0.5;
      }
      if (this.xVel === 0) {
        clearInterval(handler);
      }
    }, 50);
  }

  updatePosition(arenaWidth, arenaHeight) {
    if (this.y > 0 + this.size && this.y < arenaHeight - this.size && this.x > 0 + this.size && this.x < arenaWidth - this.size) {
      this.y = this.y + this.yVel;
      this.x = this.x + this.xVel;
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