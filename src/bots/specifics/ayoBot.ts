/* 

    THIS IS THE MAIN BOT, HE MUST BE OP !
    THIS IS NECESSARY FOR SOME FEATURES TO WORK CORRECTLY.

*/

import { AyoCommands } from "../../commands/ayo";
import { CommonBot } from "../generics/commonBot";

export class AyoBot extends CommonBot {
    // Necessary for some features, as this must be the only OP bot, for security purposes.
    static instance: AyoBot;

    constructor(ip: string, port: number) {
        super(ip, port, "ayo", false);
        AyoBot.instance = this; // See declaration comment
    }

    onSpawn() {
        super.onSpawn();
        this.addHandler(new AyoCommands(this));
    }
}