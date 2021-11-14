import CommandManager from "../../managers/commandManager";
import { SBot } from "../../bots/sBot";
import { SayCommand } from "./sayCommand";
import { ComeCommand } from "./comeCommand";

export class CommonCommands extends CommandManager {
    constructor(bot: SBot) {
        super(bot);

        this.register(new SayCommand());
        this.register(new ComeCommand(bot));
    }
}