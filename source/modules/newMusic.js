"use strict";
const ytdl = require('ytdl-core');
module.exports = class music {
    constructor(server) {
        this.server = server;
        this.servers = new Map();
    }

    clearQueue(message) {
        if(!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    skip(message) {
        if(message.author.id !== '419151003766620180' && !message.member.roles.has('453715852735414302')) return;
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if(!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');

    }

    pause(message) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if(!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    resume(message) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if(!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    setVolume(message, volume) {
        if(message.author.id !== '419151003766620180' && !message.member.roles.has('453715852735414302')) return;
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if(!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    addSong(message, args) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        let voiceChannel = message.member.voice.channel;
        if(!voiceChannel.permissionsFor(message.client.user).has('CONNECT')) return message.channel.send(`I cannot connect to this voice channel!`);
        if(!voiceChannel.permissionsFor(message.client.user).has('SPEAK')) return message.channel.send(`I cannot speak in this voice channel!`);
        if(this.servers.has(message.guild.id)) {
            //
        } else {
            //
            this.servers.set(message.guild.id, {
                voiceChannel: voiceChannel,
                songs: [],
                volume: 1,
                playing: false,
                dispatcher: undefined
            });
        }
    }

    play(guild, song) {
        if(!this.servers.has(guild.id)) return song.message.channel.send('The queue is empty!');
    }
};
