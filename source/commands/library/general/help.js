"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    var commands = {};
    for(var each in commandList) {
        commands[commandList[each].type] ? true : commands[commandList[each].type] = [];
        commands[commandList[each].type].push(config.prefix + each + (commandList[each].args === '' ? '' : ' [' + commandList[each].args.join('] [') + ']') + ': ' + commandList[each].description);
    }
    message.reply('Sending you commands in a DM!')
    message.author.send({embed: new Discord.MessageEmbed()
        .setColor(0xFF1493)
        .setTitle('Commands')
        .addField('General', commands.general)
        .addField('Music', commands.music)
        .addField('KA', commands.ka)
        .addField('Moderator', commands.mod)
        .setFooter("kaBot | The best Khan Academy Discord Bot out there!")});
};
