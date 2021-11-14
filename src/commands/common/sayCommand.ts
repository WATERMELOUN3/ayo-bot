import { SBot } from "../../bots/sBot";
import { Command } from "../command";

export class SayCommand extends Command {
    constructor() {
        super("say");
    }

    handleMessage(bot: SBot, username: string, message: string) {
        if (message.length > 0) {
            bot._bot?.chat(message);
        }
    }
}