"use strict";
module.exports = (message, commandList, config, server) => {
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.');
    if (!message.mentions.members.first()) return message.reply('Please specify a user!');
    let user = message.mentions.members.first(),
        reason = message.content.split(' ').splice(2).join(' ');
    if (!reason) return message.reply('Please specify a reason.');
    user.send(`You have been warned by <@${message.author.id}> for **${reason}**.`);
    message.channel.send(`<@${user.id}> Has been warned for **${reason}** by <@${message.author.id}>`);
};
