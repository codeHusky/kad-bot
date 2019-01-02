"use strict";
module.exports = (message, commandList, config, server) => {
    if(!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.')
    if(isNaN(message.content.toLowerCase().split(' ')[1])) return message.channel.send('Please specify a number of messages to delete!')
    x = message.content.toLowerCase().split(' ')[1];
  	message.channel.bulkDelete(~~x+1);
  	message.channel.send(`**Deleted ${x} messages**! 👍`).then(m => m.delete(2000));
};
