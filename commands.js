import { getRPSChoices } from "./game.js";
import { capitalize, DiscordAPI } from "./utils.js";

export async function InstallGuildCommand(client, appId, guildId, command) {
    const url = DiscordAPI(`applications/${appId}/guilds/${guildId}/commands`);
    return client({ url, method: 'post', data: command});
}

export const TEST_COMMAND = {
    "name": "test",
    "description": "Basic guild command",
    "type": 1
};