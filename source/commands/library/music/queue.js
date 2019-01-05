"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    var queue = server.music.queue.songs;
    if(queue.length === 0) return message.channel.send('The queue is empty!')
    var embed = new Discord.MessageEmbed()
        .setColor(0x008B00)
        .setTitle('**Queue**')
        .addField(`**1 [playing]**) **${queue[0].title}**`, queue[0].video_url);
    if(queue.length > 1) for(var i=1; i<queue.length; i++) embed.addField(`**${i+1}**) **${queue[i].title}**`, queue[i].video_url)
    message.channel.send(embed)
};
