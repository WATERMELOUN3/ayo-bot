import { CommonBot } from "./commonBot";

export class GuardBot extends CommonBot {
    constructor(ip: string, port: number, username: string) {
        super(ip, port, username, true);
    }

    onSpawn() {
        super.onSpawn();
    }
}