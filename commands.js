const { DiscordAPI } = require("./utils.js");

module.exports.InstallGuildCommand = async function (client, appId, guildId, command) {
    const url = DiscordAPI(`applications/${appId}/guilds/${guildId}/commands`);
    return client({ url, method: 'post', data: command});
}

module.exports.TEST_COMMAND =  {
    "name": "test",
    "description": "Basic guild command",
    "type": 1
};