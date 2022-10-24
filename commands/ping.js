module.exports.run = async function(interaction) {
         
 interaction.reply({content: "pong 🏓"});
 console.log(interaction.guild.members())
 // interaction.followUp({content: "pongeee"});

}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}