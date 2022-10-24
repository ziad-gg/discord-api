const axios = require('axios');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { VerifyDiscordRequest, DiscordAPI } = require('../utils.js');

const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});  

class interactionsEvent {
  constructor(interaction, res, req) {
    
    this.cache = new Map();
    
    async function logUsers(cache) {
      client({url: DiscordAPI(`/guilds/${interaction.guild_id}/members`), method: "GET",  params: { limit: 1000 }  }).then(({data}) => {data.forEach(async user => cache.set(user.user.id, user));});
      return cache
    }
    
    this.response = res
    this.token = interaction.token
    this.applicationId = interaction.application_id;
    this.channelid = interaction.channel_id;
    this.user = {
      id:  interaction.member.user.id,
      discriminator: interaction.member.user.discriminator,
      username: interaction.member.user.username,
      roles: interaction.member.roles,
      avatar: interaction.member.user.avatar,
      joinedAt: interaction.member.user.joined_at,
    };
    this.guild = {  
      id: interaction.guild_id,
      members: logUsers(this.cache)
    };
    this.command = {
      name: interaction.data.name,
      id: interaction.data.id,
      type: interaction.data.type,
    }
  };
  
  async reply(options) {
     await this.response.send({ 
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: options
      });
  };
  
  delete() {
    client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}/messages/@original`),
        method: "DELETE"
      });
  };
  
 edit(options) {
    client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}/messages/@original`),
        method: "PATCH",
        data: options
      });
  };
  
  followUp(options) {
    client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}`),
        method: "POST",
        data: options
      });
  };
}

module.exports = interactionsEvent