module.exports.run = async function(interaction) {
         
 interaction.reply({content: "pong 🏓"})
 // interaction.edit("pongeee");
  interaction.delete()
}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}