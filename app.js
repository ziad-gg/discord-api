import express from 'express'
import axios from 'axios';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, ComponentType, ButtonStyle, DiscordAPI } from './utils.js';

import { CHALLENGE_COMMAND, TEST_COMMAND, HasGuildCommands, InstallGuildCommand } from './commands.js';

const app = express();
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});

InstallGuildCommand(client, "1031396629070225438", "988515701318901770", TEST_COMMAND)


app.post('/interactions', function (req, res) {
    const { type, id, data } = req.body;
    const { name } = data;

    if (type === InteractionType.APPLICATION_COMMAND) {
      
        if (name === "test") {
            return res.send({ "type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                "data": {
                    "content": "hello world " + getRandomEmoji()
                }
            });
        }
      
    }
  
});

app.listen(3000, async() => {
    console.log('Listening on port 3000');
});