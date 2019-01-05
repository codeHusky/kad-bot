"use strict";
module.exports = (message, commandList, config, server) => {
    if(!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.')
    if(!message.mentions.members.first()) return message.reply('Please specify a user!');
    var user = message.mentions.members.first()
    user.roles.add(message.guild.roles.find(role => role.name === 'muted'));
    message.channel.send(`<@${message.author.id}> muted <@${user.id}>`)
};
