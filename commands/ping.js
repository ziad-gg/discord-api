module.exports.run = async function(interaction) {
         
 interaction.reply({content: `pong`});
  console.log(await interaction.guild.roles)

}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}