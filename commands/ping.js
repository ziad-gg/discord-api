module.exports.run = async function(interaction) {
         
 interaction.reply({content: `pong`});

}

module.exports.data = {
  name: "ping",
  description: "reply pong !",
  type: 1,
}