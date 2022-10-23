module.exports.run = async function(interaction) {
         
 interaction.reply("pong 🏓")
  interaction.delete()
}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}