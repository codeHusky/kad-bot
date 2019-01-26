"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    if (!server.music.servers.has(message.guild.id)) return;
    let timePlayed = server.music.servers.get(message.guild.id).dispatcher.streamTime;
    let seconds = timePlayed / 1000;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
};