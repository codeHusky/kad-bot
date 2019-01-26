"use strict";
const request = require('request'),
    Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    request('https://www.khanacademy.org/api/internal/scratchpads/top?sort=3&limit=40&topic_id=xffde7c31', (error, response, body) => {
        let page = 1,
            scratchpads = JSON.parse(body).scratchpads,
            embed = new Discord.MessageEmbed()
                .setColor(0x008B00)
                .setTitle(`**Current Hot List** | **Page** ${page}`);
        for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
        message.channel.send(embed)
            .then(async (msg) => {
                const filter = (reaction, user) => user.id !== msg.author.id;
                const collector = msg.createReactionCollector(filter)
                .on('collect', (r) => {
                    r.users.forEach((value, key) => {
                        if (key !== msg.author.id) r.users.remove(key);
                    });
                    switch(r.emoji.name) {
                      case '1⃣':
                          page = 1;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '2⃣':
                          page = 2;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '3⃣':
                          page = 3;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '4⃣':
                          page = 4;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '5⃣':
                          page = 5;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '6⃣':
                          page = 6;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '7⃣':
                          page = 7;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                      case '8⃣':
                          page = 8;
                          embed = new Discord.MessageEmbed()
                              .setColor(0x008B00)
                              .setTitle(`**Current Hot List** | **page** ${page}`);
                          for (let i = page * 5 - 5; i < page * 5; i++) embed.addField(`**${i + 1}**) ${scratchpads[i].title}`, `Created by: **${scratchpads[i].authorNickname}** | **${scratchpads[i].sumVotesIncremented}** votes | **${scratchpads[i].spinoffCount}** Spin-Offs | [**Link**](${scratchpads[i].url})`);
                          msg.edit(embed);
                          break;
                    }
                });
                await msg.react('1⃣');
                await msg.react('2⃣');
                await msg.react('3⃣');
                await msg.react('4⃣');
                await msg.react('5⃣');
                await msg.react('6⃣');
                await msg.react('7⃣');
                await msg.react('8⃣');
            });
    });
};
