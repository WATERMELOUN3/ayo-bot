import { autoEat } from "mineflayer-auto-eat";
import { pathfinder } from "mineflayer-pathfinder";
import { CommonCommands } from "../../commands/common";
import { SBot } from "../sBot";

export class CommonBot extends SBot {
    constructor(ip: string, port: number, username: string, checkWhitelist = true) {
        super(ip, port, username, checkWhitelist);
        this._bot.loadPlugins([pathfinder, autoEat]);

        this._bot.on("autoeat_started", () => { console.log("Auto Eat started!"); });
        this._bot.on("health", () => { this.onHealth(); });
        this._bot.on("goal_reached", () => { this._state = "idle"; });
        this._bot.on("physicsTick", () => { this.onPhysicsTick(); });
    }

    onSpawn() {
        super.onSpawn();
        this.addHandler(new CommonCommands(this));
    }

    onHealth() {
        // Disable the plugin if the bot is at 20 food points
        if (this._bot.food === 20) this._bot.autoEat.disable();
        else this._bot.autoEat.enable(); // Else enable the plugin again
    }

    onPhysicsTick() {
        if (this._state === "idle") {
            const entity = this._bot.nearestEntity();
            if (entity) this._bot.lookAt(entity.position.offset(0, entity.height, 0));
        }
    }
}