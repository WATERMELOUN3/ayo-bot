import fs from "fs";
import { Bot } from "mineflayer";
import PasswordGenerator from "generate-password";
import { AyoBot } from "../bots/specifics/ayoBot";

const LOGINS_FILE = "logins.json";
const LOGINS_FILE_ENCODING = "utf-8";
const PASSWORD_GEN_OPTS = {
    length: 16,
    numbers: true
};

function loginsReplacer(key: any, value: any) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

function loginsReviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}


export class Logins {
    static logins?: Map<string, string> = undefined;

    static logBot(bot: Bot) {
        if (!this.logins) {
            if (fs.existsSync(LOGINS_FILE)) {
                const rawData = fs.readFileSync(LOGINS_FILE, LOGINS_FILE_ENCODING);
                this.logins = JSON.parse(rawData, loginsReviver);
            } else {
                this.logins = new Map();
            }
        }

        if (this.logins?.has(bot.username)) {
            const pwd = this.logins.get(bot.username);
            bot.chat("/login " + pwd);
            console.log(`${bot.username} connected with password ${pwd}`);
        } else {
            const pwd = PasswordGenerator.generate(PASSWORD_GEN_OPTS);
            this.logins?.set(bot.username, pwd);
            bot.chat("/register " + pwd);
            const data = JSON.stringify(this.logins, loginsReplacer);
            fs.writeFileSync(LOGINS_FILE, data);
            console.log(`${bot.username} registered with password ${pwd}`);
        }
    }
}