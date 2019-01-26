"use strict";
const request = require('request'),
    Discord = require('discord.js');
module.exports = async (message, commandList, config, server) => {
    if (!message.mentions.members.first()) return message.reply('Please specify a user!');
    let user = message.mentions.members.first();
    server.db.serialize(() => {
        server.db.all('SELECT * FROM users', async (err, data) => {
            let f;
            await data.forEach((d) => {
                if(d.id === user.id) return f = true;
            });
            if (!f) return message.channel.send(`<@${user.id}> Does not have their KA account synced yet!`)
            request('https://www.khanacademy.org/api/internal/user/profile?kaid=' + data.find(d => d.id === user.id).kaid, (err, res, body) => {
                if(err) return console.error('Khan Academy\'s API seems to be down.');
                body = JSON.parse(body)
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setColor(0x1fab54)
                    .setAuthor(user.user.username, user.user.avatarURL)
                    .setDescription(`**${user.user.tag}** is **${body.nickname}** *([@${body.username !== '' ? body.username : body.kaid}](https://www.khanacademy.org/profile/${body.username !== '' ? body.username : body.kaid}))*`)
                    .setFooter('Called by ' + message.author.tag)});
            });
        });
    });
};
