const express = require('express');
const axios = require('axios');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { VerifyDiscordRequest, DiscordAPI } = require('./utils.js');
const { TEST_COMMAND, InstallGuildCommand } = require('./commands.js');
const { readFileSync, readdirSync } = require('node:fs');

const app = express();
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});  

const commands = new Map();

for (let file of readdirSync("commands")) {
   const command = require("./commands/"+file);
   commands.set(command.data.name, command);
   InstallGuildCommand(client, process.env.APP_ID, command.data)
}


app.post('/interactions', async function (req, res) {
    const { type, id, data } = req.body;
    const { name } = data;  
    const command = await commands.get(name);
    if (!command) return;
  
   const interaction = {
     reply: async function(content) {
       
     }
   }
   command.run(res, InteractionResponseType)
});

app.listen(3000, async() => {
  const { data } = await client({url: DiscordAPI("/users/@me"), method: "GET"});
  console.log(`${data.username} bot is ready`);
})