module.exports.run = async function(interaction) {
         
 interaction.reply({content: "pong 🏓"});
 const user = await interaction.guild.members
 console.log(user)

}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}