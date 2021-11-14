import { getGenericBot } from "../../bots";
import { SBot } from "../../bots/sBot";
import { AyoBot } from "../../bots/specifics/ayoBot";
import { CONSTS } from "../../consts";
import { BotManager } from "../../managers/botManager";
import { Command } from "../command";

export class SpawnCommand extends Command {
    constructor() {
        super("spawn");
    }

    handleMessage(bot: SBot, username: string, message: string) {
        if (!(bot instanceof AyoBot)) return;
        const rawMessage = message.split(' ');
        const args = rawMessage.filter((v) => {
            return v.match(/--[a-zA-Z-]+/g) || v.match(/-[a-zA-Z]/g);
        });
        const botTags = rawMessage.filter((v) => {
            return !(v.match(/--[a-zA-Z-]+/g) || v.match(/-[a-zA-Z]/g));
        });
        if (args.includes("--remove") || args.includes("-r")) {
            botTags.forEach(botTag => {
                const result = BotManager.instance.removeBotByTag(botTag);
                if (!result) bot._bot.chat(botTag + " n'éxiste pas...");
            });
        } else {
            botTags.forEach(a => {
                let name: string, tag: string;
                if (a.match(/[a-zA-Z]+:[a-zA-Z]+/g)) {
                    [name, tag] = a.split(':');
                } else {
                    tag = a;
                    name = BotManager.instance.getNametag(tag);
                }
                const BotType = getGenericBot(tag);
                if (BotType !== undefined) {
                    BotManager.instance.addBot(
                        new BotType(
                            CONSTS.SERVER_IP,
                            CONSTS.SERVER_PORT,
                            name
                        )
                    );
                } else {
                    bot._bot.chat(`Le type de bot ${tag} n'éxiste pas...`);
                }
            });
        }
    }
}