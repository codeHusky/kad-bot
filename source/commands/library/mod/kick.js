"use strict";
module.exports = (message, commandList, config, server) => {
    if(!message.guild.members.get(message.author.id).hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to use this command.');
    if(!message.mentions.members.first()) return message.reply('Please specify a user!');
    var user = message.mentions.members.first()
    var reason = message.content.split(' ').splice(2).join(' ');
    user.kick(reason);
    message.channel.send(`Kicked **${user}** For **${reason}**`);
};
