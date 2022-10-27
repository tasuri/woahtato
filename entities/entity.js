import Position from "./position.js";

export default class Entity extends Position {

    constructor(type, x, y) {
        super(x, y);

        this.type = type;
    }


    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
        this.drawShotRange(this.shotRange);
      }

}