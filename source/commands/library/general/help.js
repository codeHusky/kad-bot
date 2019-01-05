"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    var dmCommands = {};
    for(var each in commandList.general) {
        dmCommands[commandList.general[each].type] ? true : dmCommands[commandList.general[each].type] = [];
        dmCommands[commandList.general[each].type].push(config.prefix + each + (commandList.general[each].args === '' ? '' : ' [' + commandList.general[each].args.join('] [') + ']') + ': ' + commandList.general[each].description);
    }
    message.reply('Sending you commands in a DM!')
        .then(msg => {
            message.author.send({embed: new Discord.MessageEmbed()
                .setColor(0xFF1493)
                .setTitle('Commands')
                .addField('General', dmCommands.general)
                .addField('Music', dmCommands.music)
                .addField('KA', dmCommands.ka)
                .addField('Moderator', dmCommands.mod)
                .setFooter("kaBot | The best Khan Academy Discord Bot out there!")});
        })
};
