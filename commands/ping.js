module.exports.run = async function(res, InteractionResponseType) {
         
       res.send({ 
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {"content": "pong"}
         });
 
}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}