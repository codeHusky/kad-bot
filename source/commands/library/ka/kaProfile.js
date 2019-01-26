"use strict";
const request = require('request'),
    Discord = require('discord.js');
module.exports = async (message, commandList, config, server) => {
    let user = message.content.split(' ')[1];
    if (!user) return message.channel.send('Please specify a username!');
    request('http://www.khanacademy.org/api/internal/signup/check-username?username='+user, (error, response, body) => {
        if (body !== "That username isn't available.") return message.channel.send('No user has that username!');
        request('http://www.khanacademy.org/api/internal/user/profile?username='+user, (error, response, body) => {
            if (!JSON.parse(body)) return message.channel.send(`**${user}** is a child account, and you may not see info about it.`);
            user = JSON.parse(body);
            message.channel.send(new Discord.MessageEmbed()
                .setColor(0x008c00)
                .setTitle(`User data for KA user **${user.username}**`)
                .addField('Nickname', user.nickname)
                .addField('Child account', user.isChildAccount ? 'Yes' : 'No', true)
                .addField('Videos Watched', user.countVideosCompleted, true)
                .addField('kaid', user.kaid)
                .addField('Avatar', user.avatar.displayName, true)
                .addField('Energy Points', user.points, true));
        });
    });
};
