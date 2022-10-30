import Position from "./position.js";

export default class Entity extends Position {

    constructor(type, x, y) {
        super(x, y);

        this.type = type;
    }

    set setContext(ctx) {
        if (CanvasRenderingContext2D.prototype.isPrototypeOf(ctx)) {
          this.ctx = ctx;
        } else {
          throw 'setContext(ctx): ctx is not type of CanvasRenderingContext2D';
        }
      }


    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
        if(typeof this.drawShotRange === 'function') {
            this.drawShotRange(this.shotRange);
        }
      }

}