import { SBot } from "../bots/sBot";

class Command {
    tag;

    constructor(tag: string) {
        this.tag = tag;
    }

    handleMessage(bot: SBot, username: string, message: string) {}
}

export { Command };