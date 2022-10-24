const axios = require('axios');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { VerifyDiscordRequest, DiscordAPI } = require('../utils.js');

const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});  

class interactionsEvent {
  constructor(interaction, res, req) {
    
    this.cache = new Map();
    
    async function fetchGuildOwner(guild_id) {
     const { data } = await client({url: DiscordAPI(`/guilds/${guild_id}`), method: "GET"});
      return await data.owner_id;
    }
    
    async function fetchGuildRoles(guild_id, cache) {
      const { data } = await client({url: DiscordAPI(`/guilds/${guild_id}`), method: "GET"});
      await data.roles.forEach(role => {
        if (!role.managed) cache.set(role.id, role)
      });
      return cache
    }
    
    async function logUsers(cache) {
      await client({url: DiscordAPI(`/guilds/${interaction.guild_id}/members`), method: "GET",  params: { limit: 1000 }  }).then(({data}) => {data.forEach(async user => cache.set(user.user.id, user));});
      return await cache
    }
    async function logChannels(cache) {
      await client({url: DiscordAPI(`/guilds/${interaction.guild_id}/channels`), method: "GET",  params: { limit: 1000 }  }).then(({data}) => {
        data.forEach(async channel => {
          channel.send = async (data) => client({url: DiscordAPI(`/channels/${channel.id}/messages`), method: "POST", data}),
          channel.delete = async () => client({url: DiscordAPI(`/channels/${channel.id}`), method: "DELETE"}),
          cache.set(channel.id, channel)
        });
      });
      return await cache
    }
    this.response = res
    this.token = interaction.token
    this.applicationId = interaction.application_id;
    this.options = "soon"
    this.channel = {
      id: interaction.channel_id,
      delete: async () => client({url: DiscordAPI(`/channels/${interaction.channel_id}`), method: "DELETE"}),
      send: async (data) => client({url: DiscordAPI(`/channels/${interaction.channel_id}/messages`), method: "POST", data}),
      bulkDelete: async (amount) => client({url: DiscordAPI(`/channels/${interaction.channel_id}/bulk-delete`), method: "POST", data: {messages: amount}}),
    };
    this.user = {
      id:  interaction.member.user.id,
      discriminator: interaction.member.user.discriminator,
      username: interaction.member.user.username,
      roles: {
        cache: interaction.member.roles,
        add: (roleId) => client({url: DiscordAPI(`/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/${roleId}`), method: "PUT"}),
        remove: (roleId) => client({url: DiscordAPI(`/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/${roleId}`), method: "DELETE"}),
      },
      avatar: interaction.member.user.avatar,
      joinedAt: interaction.member.user.joined_at,
      avatarURL: async () => `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png?size=1024`,
    };
    this.guild = {  
      id: interaction.guild_id,
      members: logUsers(this.cache),
      channels: logChannels(new Map()),
      owner: fetchGuildOwner(interaction.guild_id),
      roles: {
        cache: fetchGuildRoles(interaction.guild_id, new Map()),
        delete: (roleId) => client({url: DiscordAPI(`/guilds/${interaction.guild_id}/roles/${roleId}`), method: "DELETE"}),
      }
    };
    this.command = {
      name: interaction.data.name,
      id: interaction.data.id,
      type: interaction.data.type,
    }
  };
  
  async reply(options) {
    if (!options) throw new Error("invalid body text");
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
       if (!options) throw new Error("invalid body text");
    client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}/messages/@original`),
        method: "PATCH",
        data: options
      });
  };
  
  followUp(options) {
        if (!options) throw new Error("invalid body text");
    client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}`),
        method: "POST",
        data: options
      });
  };
};

module.exports = interactionsEvent