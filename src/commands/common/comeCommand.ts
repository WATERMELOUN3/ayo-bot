import { goals, Movements } from "mineflayer-pathfinder";
import { SBot } from "../../bots/sBot";
import { Command } from "../command";
import MinecraftData, { IndexedData } from "minecraft-data";

export class ComeCommand extends Command {
    defaultMove?: Movements;
    mcData?: IndexedData;

    constructor(sbot: SBot) {
        super("come");
    }

    handleMessage = (sbot: SBot, username: string, message: string) => {
        const bot = sbot._bot!;
        if (message.length == 0) {
            const target = bot.players[username] ? bot.players[username].entity : null
            if (!target) {
                bot.chat("T'es ou frero ?");
                return;
            }

            this.mcData = MinecraftData(sbot._bot!.version);
            this.defaultMove = new Movements(sbot._bot!, this.mcData!);
            bot.pathfinder.setMovements(this.defaultMove!);

            const goal = new goals.GoalFollow(target, 1);
            sbot._state = "moving";
            bot.pathfinder.setGoal(goal);
            bot.chat("On my way! (" + username + ")");
        }
    }
}