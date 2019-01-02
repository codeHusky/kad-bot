"use strict";
module.exports = (message, commandList, config, server) => {
    if(!message.guild.members.get(message.author.id).hasPermission('BAN_MEMBERS')) return message.reply('You do not have permissions to use this command.');
    if (!message.content.toLowerCase().split(' ')[1]) return message.reply('Please specify a user ID!');
    message.guild.members.unban(message.content.toLowerCase().split(' ')[1])
    .then(user => {
        message.channel.send(`Unbanned **${user.username}#${user.discriminator}** with the id **${message.content.toLowerCase().split(' ')[1]}**`);
    })
};
