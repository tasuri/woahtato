import config from "../core/config.js"
import Entity from "./entity.js"
import Player from "./player.js";

export default class Enemy extends Entity {

    constructor(type) {

        super(type, Math.round(Math.random() * config.arenaWidth), Math.round(Math.random() * config.arenaHeight), 0, 0, 1.5);
        this.size = 15,
            this.ctx = undefined;

        this.inRange = false;
    }

    set setInRange(state) {
        if (typeof state === 'boolean') {
            this.inRange = state;
        } else {
            console.warn("inRange can only be declared as a boolean")
        }
    }

    movement(player) {

        if (Math.abs(this.x - player.x) > player.size || Math.abs(this.y - player.y) > player.size) {
            let diffX, diffY, diffAbsX, diffAbsY, moveX, moveY;

            diffX = player.x - this.x;
            diffY = player.y - this.y;

            diffAbsX = Math.abs(diffX);
            diffAbsY = Math.abs(diffY);

            if (diffAbsX > diffAbsY) {
                moveY = diffAbsY / diffAbsX * this.maxVel;
                moveX = this.maxVel;
            } else {
                moveX = diffAbsX / diffAbsY * this.maxVel;
                moveX
                moveY = this.maxVel;
            }

            if (diffX < 0) {
                moveX = -Math.abs(moveX)
            }
            if (diffY < 0) {
                moveY = -Math.abs(moveY)
            }

            this.x += moveX;
            this.y += moveY;

        }
    }

}

//MaxVel = 3;
//
//YouX = 250;
//YouY = 421;
//
//EneX = 125;
//EneY = 552;
//
//diffX = YouX - EneX = 125;
//diffY = YouY - EneY = -131;
//
//diffAbsX = Math.abs(diffX);
//diffAbsY = Math.abs(diffY);
//
//if(diffAbsX > diffAbsY){
//    moveY = diffAbsY / diffAbsX * MaxVel = 2.862595;
//    moveX = MaVel; // 3
//}else{
//    moveX = diffAbsX / diffAbsY //Trifft im BS nicht zu
//    moveY = MaVel; // 3
//}
//
//if(diffY < 0){
//    moveY = -Math.abs(moveY)
//}
//if(diffX < 0){
//    moveX = -Math.abs(moveX)
//}

/**
 * 
 * width = 15
 * height = 8.5
 * 
 * kleinereZahl/größereZahl = 0.566667 Höhengewinn
 * Breitengewinn = 1
 * 
 * 0.566667 * maxGeschw
 * 1 * maxGeschw
 * 
 * with = 20
 * height = 20
 * 
 * 20/20 = 1
 * 20/20 = 1
 * 
 * 
 */