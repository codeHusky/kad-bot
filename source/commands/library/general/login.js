"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
      server.oauthClient.requestToken()
        .then((response) => {
            message.reply('Instructions have been sent to your DMs');
            message.author.send(new Discord.MessageEmbed()
                .setColor(0x20B2AA)
                .setTitle('Click the link below to link your Khan Academy and Discord accounts.')
                .setDescription(`[Connect Khan Academy Account](https://www.khanacademy.org/api/auth2/authorize?oauth_token=${response.token})`));
      });
};
