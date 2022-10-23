const axios = require('axios');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { VerifyDiscordRequest, DiscordAPI } = require('../utils.js');

const client = axios.create({
    headers: {'Authorization': `Bot ${process.env.DISCORD_TOKEN}`}
});  

class interactionsEvent {
  constructor(interaction, res, req) {
    this.interaction = interaction
    this.req = req;
    this.res = res;
    this.token = req.body.token
    this.applicationId = req.body.application_id;
    this.channelid = interaction.channel_id;
    console.log(this.applicationId)
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
    };
    this.command = {
      name: interaction.data.name,
      id: interaction.data.id,
      type: interaction.data.type,
    }
  };
  
  async reply(options) {
       this.res.send({ 
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: options
      });
  };
  
  delete() {
   return client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}/messages/@original`),
        method: "DELETE"
      });
  };
  
 edit(options) {
   return client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}/messages/@original`),
        method: "PATCH",
        data: options
      });
  };
  
  followUp(options) {
   return client({
        url: DiscordAPI(`/webhooks/${this.applicationId}/${this.token}`),
        method: "POST",
        data: options
      });
  };
}

module.exports = interactionsEvent

// {
//   app_permissions: '4398046511103',
//   application_id: '1031396629070225438',
//   channel_id: '999567239386763264',
//   data: {
//     guild_id: '988515701318901770',
//     id: '1033734774466027572',
//     name: 'ping',
//     type: 1
//   },
//   entitlement_sku_ids: [],
//   guild_id: '988515701318901770',
//   guild_locale: 'en-US',
//   id: '1033871469802963036',
//   locale: 'en-US',
//   member: {
//     avatar: null,
//     communication_disabled_until: null,
//     deaf: false,
//     flags: 0,
//     is_pending: false,
//     joined_at: '2022-06-20T18:48:28.981000+00:00',
//     mute: false,
//     nick: null,
//     pending: false,
//     permissions: '4398046511103',
//     premium_since: null,
//     roles: [],
//     user: {
//       avatar: '5d2506644d459d9bdf75905d80a44da2',
//       avatar_decoration: null,
//       discriminator: '1768',
//       id: '860865950945378325',
//       public_flags: 128,
//       username: 'Ziath'
//     }
//   },
//   token: 'aW50ZXJhY3Rpb246MTAzMzg3MTQ2OTgwMjk2MzAzNjpJZ2dqNmJ4ZndYa3RYb2VNUERxTVFYS01QSGFYQ3VWQ3o2Tkx3Q1l1VU9GQUowUWZrbXZEUXV0THkwRzI4ZVJPZFdMaTlIZFlva3dvZlNYeEdldVVnY2d0a3F3Wmc2T1RIeEc4Qk55cHBuMEJSVVI4QTZCallZM1U1RDRnbjNqZQ',
//   type: 2,
//   version: 1
// }