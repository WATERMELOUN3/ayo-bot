import { SBot } from "../bots/sBot";
import { Command } from "../commands/command";

class CommandManager {
    #commands: Map<string, Command> = new Map();
    #bot: SBot;

    constructor(bot: SBot) {
        this.#bot = bot;
    }

    register = (command: Command) => {
        this.#commands.set(command.tag, command);
    }

    onChat = (username: string, message: string) => {
        const [command, ...body] = message.split(" ")
        if (this.#commands.has(command)) {
            this.#commands.get(command)?.handleMessage(this.#bot, username, body.join(" "));
        }
    }
}

export default CommandManager;