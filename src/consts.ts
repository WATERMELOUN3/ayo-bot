import DotEnv from "dotenv";
DotEnv.config();

function getEnvironnementVariable(varName: string, defaultValue: any) {
    const result = process.env[varName];
    if(result !== undefined)
        return result;
    else
        return defaultValue;
}

export const CONSTS = {
    VERSION_MINOR: 1,
    VERSION_MAJOR: 0,
    SERVER_IP: getEnvironnementVariable("AYO_IP", "127.0.0.1"),
    SERVER_PORT: getEnvironnementVariable("AYO_PORT", 25565)
};