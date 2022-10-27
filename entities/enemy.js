import config from "../config.js"
import Entity from "./entity.js"

export default class Enemy extends Entity {

    constructor(type) {
        super(Math.random() * (config.arenaWidth - 0) + 0, Math.random() * (config.arenaHeight - 0) + 0)

    }

}