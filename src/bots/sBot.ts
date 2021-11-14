import CommandManager from "../managers/commandManager";
import Mineflayer from "mineflayer";
import { Logins } from "../utils/logins";
import { BotManager } from "../managers/botManager";

class SBot {
    tag: string;
    #handlers: CommandManager[] = [];

    #ip: string;
    #port: number;

    _bot: Mineflayer.Bot;
    _state: string = "idle";

    constructor(ip: string, port: number, tag: string, checkWhitelist: boolean = true) {
        this.#ip = ip;
        this.#port = port;
        this.tag = tag;
        if (checkWhitelist) BotManager.instance.whitelistBot(tag);

        this._bot = Mineflayer.createBot({
            host: this.#ip,
            port: this.#port,
            username: this.tag
        });
        this._bot.once('spawn', () => { this.onSpawn(); });
        this._bot.on('chat', (username, message) => { this.onChat(username, message); });

        // Debug
        this._bot.on('kicked', (...data: any[]) => { console.log([this.tag + ' kick: '].concat(data)) });
        this._bot.on('error', (...data: any[]) => { console.log([this.tag + ' err: '].concat(data)) });
    }

    addHandler(handler: CommandManager): number {
        return this.#handlers.push(handler);
    }

    onSpawn() { 
        Logins.logBot(this._bot);
    }

    onChat(username: string, message: string) {
        console.log(username + ": " + message);
        const commandTag = this.tag + " ";
        if (username === this.tag) return;
        else if (message.toLowerCase().startsWith(commandTag.toLowerCase()) && message.length > commandTag.length) {
            message = message.substring(commandTag.length);
            this.#handlers.forEach(i => {
                i.onChat(username, message);
            });
        }
    }
}

export { SBot };