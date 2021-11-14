import { CommonBot } from "./generics/commonBot";
import { SBot } from "./sBot";
import { AyoBot } from "./specifics/ayoBot";

const genericBots: { [id: string]:typeof SBot } = {
    retard: CommonBot
};

function getDefaultBot(ip: string, port: number): SBot {
    return new AyoBot(ip, port);
}

function getGenericBot(tag: string): typeof SBot | undefined {
    return genericBots[tag];
}

export { getDefaultBot, getGenericBot };