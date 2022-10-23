import express from 'express'
import axios from 'axios';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, DiscordAPI } from './utils.js';
import { TEST_COMMAND, InstallGuildCommand } from './commands.js';
import { readFileSync, readdirSync } from 'node:fs';

const app = express();
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});  

import command from './commands';


for (let file of readdirSync("commands")) {
   console.log(file)
}
//InstallGuildCommand(client, "1031396629070225438", "988515701318901770", TEST_COMMAND)


app.post('/interactions', function (req, res) {
    const { type, id, data } = req.body;
    const { name } = data;  
});

app.listen(3000, async() => {
    console.log('Listening on port 3000');
});