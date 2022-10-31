import config from "../config.js"
import Entity from "./entity.js"

export default class Enemy extends Entity {

    constructor(type) {

        super(Math.random() * (config.arenaWidth - 0) + 0, Math.random() * (config.arenaHeight - 0) + 0)
        this.x = 100, this.y = 100, 
        this.size = 15, 
        this.ctx = undefined;

        this.inRange = false;
    }

    set setInRange(state) {
        if(typeof state === 'boolean') {
            this.inRange = state;
        } else {
            console.warn("inRange can only be declarated as a boolean")
        }
    }

}