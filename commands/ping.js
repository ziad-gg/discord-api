export const commands = {
  name: "ping",
  description: "reply pong !",
  type: 1,
 callback(res, InteractionResponseType) {
         
         res.send({ 
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {"content": "hello world"}
         });
 }
}