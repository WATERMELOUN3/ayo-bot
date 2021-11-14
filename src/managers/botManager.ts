import { getDefaultBot } from "../bots";
import { SBot } from "../bots/sBot";

export class BotManager {
    static instance: BotManager;

    #defaultBot?: SBot = undefined;
    #bots: Map<string, SBot> = new Map();

    #ip: string;
    #port: number;
    #nonce = 0;

    constructor(ip: string, port: number) {
        BotManager.instance = this;
        this.#ip = ip;
        this.#port = port;
    }

    start() {
        this.#defaultBot = getDefaultBot(this.#ip, this.#port);
        this.#bots.set(this.#defaultBot._bot.username, this.#defaultBot);
    }

    addBot(bot: SBot) {
        this.#bots.set(bot.tag, bot);
    }

    removeBotByTag(tag: string): boolean {
        console.log(this.#bots);
        this.#bots.get(tag)?._bot.quit("Removed by BotManager");
        return this.#bots.delete(tag);
    }

    getBot(tag: string): SBot | undefined {
        return this.#bots.get(tag);
    }

    getNametag(tag: string = "retard"): string {
        const newTag = tag + this.#nonce.toString();
        this.#nonce++;
        return newTag;
    }

    whitelistBot(tag: string) {
        console.log(`Whitelisting ${tag} via ayo`);
        // worst way to do this, fix ASAP
        this.#defaultBot?._bot.chat("/whitelist add " + tag);
    }
}