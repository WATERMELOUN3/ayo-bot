import CommandManager from "../../managers/commandManager";
import { SBot } from "../../bots/sBot";
import { SpawnCommand } from "./spawnCommand";

export class AyoCommands extends CommandManager {
    constructor(bot: SBot) {
        super(bot);

        this.register(new SpawnCommand());
    }
}