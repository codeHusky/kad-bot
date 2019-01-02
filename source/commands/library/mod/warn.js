"use strict";
module.exports = (message, commandList, config, server) => {
    if(!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.')
    if(!message.mentions.members.first()) return message.reply('Please specify a user!');
    var user = message.mentions.members.first()
    var reason = message.content.split(' ').splice(2).join(' ');
    user.send(`You have been warned by <@${message.author.id}> for **${reason}**.`)
    message.channel.send(`<@${user.id}> Has been warned for **${reason}**.`)
};
