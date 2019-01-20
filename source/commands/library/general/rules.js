"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    let rules = config.servers[message.guild.id].rules;
    console.log(rules);
    for(let i = 0; i < rules.length; rules++) rules[i] = " - " + rules[i];
    console.log(rules);
    message.reply('Sending you rules in a DM!');
    message.author.send({embed: new Discord.MessageEmbed()
        .setColor(0xFF1493)
        .setTitle(message.guild.name)
        .addField('Rules:', rules)
        .setFooter("kaBot | The best Khan Academy Discord Bot out there!")});
};
