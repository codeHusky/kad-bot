"use strict";
module.exports = (message, commandList, config, server) => {
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.');
    if (!message.mentions.members.first()) return message.reply('Please specify a user!');
    let user = message.mentions.members.first();
    user.roles.remove(message.guild.roles.find((role) => role.name === config.servers[message.guild.id].mutedRole));
    message.channel.send(`<@${message.author.id}> unmuted <@${user.id}>`);
};
