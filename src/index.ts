import { CONSTS } from "./consts";
import { BotManager } from "./managers/botManager";

const botManager = new BotManager(CONSTS.SERVER_IP, CONSTS.SERVER_PORT);
botManager.start();