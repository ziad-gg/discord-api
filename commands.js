const { DiscordAPI } = require("./utils.js");

module.exports.InstallGuildCommand = async function (client, appId, command) {
    const url = DiscordAPI(`applications/${appId}/commands`);
    return client({ url, method: 'post', data: command});
};