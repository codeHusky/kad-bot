"use strict";
const ytdl = require('ytdl-core');

class music {
    constructor(server) {
        this.server = server;
        this.queue = {
            textChannel: undefined,
            voiceChannel: undefined,
            dispatcher: undefined,
            songs: [],
            volume: 1,
            playing: false
        };
    }

    clearQueue() {
        this.queue.songs = [];
        this.queue.dispatcher.end();
    }

    skip(message) {
        if(message.author.id !== '419151003766620180') return
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`)
        if(this.queue.songs.length === 0) return message.channel.send(`No songs are in the queue0!`)
        this.queue.dispatcher.end();
        if(this.queue.songs.length > 0) message.channel.send("Skipped Current Song!");
    }

    pause(message) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`)
        if(!this.queue.playing) return message.channel.send(`No song is currently playing!`)
        if(this.queue.dispatcher.paused) return message.channel.send('Music is currently paused!')
        this.queue.dispatcher.pause();
        this.queue.playing = false;
        message.channel.send("Paused Current Song!");
    }

    resume(message) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`)
        if(this.queue.length === 0) return message.channel.send(`The queue is empty!`)
        if(!this.queue.dispatcher.paused) return message.channel.send('Music is currently playing!')
        this.queue.dispatcher.resume();
        this.queue.playing = true;
        message.channel.send("Resumed Current Song!");
    }

    setVolume(message, volume) {
      if(message.author.id !== '419151003766620180') return
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`)
        if(!this.queue.playing) return message.channel.send(`No song is currently playing!`)
        this.queue.dispatcher.setVolume(volume / 100);
        message.channel.send(`Set volume to ${this.queue.dispatcher.volume}`);
    }

    async addSong(message, args) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`)
        let voiceChannel = message.member.voice.channel;
        if(!voiceChannel.permissionsFor(message.client.user).has('CONNECT')) return message.channel.send(`I cannot connect to this voice channel!`);
        if(!voiceChannel.permissionsFor(message.client.user).has('SPEAK')) return message.channel.send(`I cannot speak in this voice channel!`);

        //var valid = await ytdl.validateID(args[1]);
        //if(!valid) return

        var song = await ytdl.getInfo(args[1]);
        if(this.queue.songs.length === 0) {
            this.queue.textChannel = message.channel;
            this.queue.voiceChannel = voiceChannel;
            this.queue.songs.push(song);
            try {
                this.play(message.guild, this.queue.songs[0])
            } catch (error) {
                this.queue.textChannel = undefined;
                this.queue.voiceChannel = undefined;
                this.queue.songs = [];
                return message.channel.send(`Failed to join voice channel ${error}`)
            }
        } else {
            this.queue.songs.push(song);
            message.channel.send(`**${song.title}** has been added to the queue.`)
        }
    }

    play(guild, song) {
        if(this.queue.songs.length === 0) {
            this.queue.textChannel.send('Queue Concluded');
            this.queue.voiceChannel.leave();
            this.queue.textChannel = undefined;
            this.queue.voiceChannel = undefined;
            this.queue.playing = false
            return;
        }
        this.queue.voiceChannel.join().then(connection => {
            this.queue.dispatcher = connection.play(ytdl(song.video_url), {
                filter: 'audioonly',
                volume: this.queue.volume,
                passes: 25,
                bitrate: 96000
            })
            .on('end', (reason) => {
                this.queue.songs.shift();
                this.play(guild, this.queue.songs[0]);
            })
            .on('error', (error) => console.error(error));
            this.queue.playing = true;
            this.queue.textChannel.send(`Started playing: **${song.title}**`);
        });
    }
}

module.exports = music;
