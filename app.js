import express from 'express'
import axios from 'axios';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, ComponentType, ButtonStyle, DiscordAPI } from './utils.js';
import { getShuffledOptions, getResult } from './game.js';
import { CHALLENGE_COMMAND, TEST_COMMAND, HasGuildCommands } from './commands.js';

const app = express();
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));
const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});

let activeGames = {};

app.post('/test', function (req, res) {
    let { type, id, data } = req.body;


    if (type === InteractionType.PING) {
        return res.json({ "type": InteractionResponseType.PONG });
    };

    if (type === InteractionType.APPLICATION_COMMAND){
        let { name } = data;
        if (name === "test") {
            return res.send({
                "type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                "data": {
                    // Fetches a random emoji to send from a helper function
                    "content": "hello world " + getRandomEmoji()
                }
            });
        }

    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});