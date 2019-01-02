"use strict";
module.exports = (message, commandList, config, server) => {
    if(!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.')
    if(server.music.queue.songs.length === 0) return message.channel.send('There is nothing in the queue!')
    server.music.clearQueue();
    message.channel.send(`The queue has been cleared by <@${message.author.id}>!`)
};
