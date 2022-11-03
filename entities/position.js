export default class Position {

    constructor(x, y, xVel = 0, yVel = 0, maxVel = 3) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.maxVel = maxVel;
    }


}