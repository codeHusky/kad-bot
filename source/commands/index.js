"use strict";
/** Command List **/
module.exports = {
    /** General library **/
    general: {
        help: {
            enabled: true,
            description: 'Help',
            type: 'general',
            command: 'library/general/help.js',
            args: ''
        },
        bans: {
            enabled: true,
            description: 'Displays server bans',
            type: 'general',
            command: 'library/general/bans.js',
            args: ''
        },
        cat: {
            enabled: true,
            description: 'Shows a random cat picture',
            type: 'general',
            command: 'library/general/cat.js',
            args: ''
        },
        dog: {
            enabled: true,
            description: 'Shows a random dog picture',
            type: 'general',
            command: 'library/general/dog.js',
            args: ''
        },
        login: {
            enabled: true,
            description: 'Connect your KA account',
            type: 'general',
            command: 'library/general/login.js',
            args: ''
        },
        suggestion: {
            enabled: true,
            description: 'Use this command to give a suggestion to improve the server!',
            type: 'general',
            command: 'library/general/suggestion.js',
            args: ''
        },
        userinfo: {
            enabled: true,
            description: 'Display info about a specified user',
            type: 'general',
            command: 'library/general/userinfo.js',
            args: ['user']
        },
        serverinfo: {
            enabled: true,
            description: 'Display info about the server',
            type: 'general',
            command: 'library/general/serverinfo.js',
            args: ''
        },
        hotlist: {
            enabled: true,
            description: 'Khan Academy current Hot List',
            type: 'ka',
            command: 'library/ka/hotList.js',
            args: ''
        },
        kabadgecount: {
            enabled: true,
            description: 'Khan Academy total Badge count',
            type: 'ka',
            command: 'library/ka/kaBadgeCount.js',
            args: ''
        },
        kaprofile: {
            enabled: true,
            description: 'Get data about a Khan Academy user',
            type: 'ka',
            command: 'library/ka/kaProfile.js',
            args: ['username']
        },
        play: {
            enabled: true,
            description: 'Plays a song from YT',
            type: 'music',
            command: 'library/music/play.js',
            args: ['url']
        },
        yt: {
            enabled: true,
            description: 'Searches songs to play on YT',
            type: 'music',
            command: 'library/music/yt.js',
            args: ['query']
        },
        skip: {
            enabled: true,
            description: 'Skips current song',
            type: 'music',
            command: 'library/music/skip.js',
            args: ''
        },
        pause: {
            enabled: true,
            description: 'Pauses current song',
            type: 'music',
            command: 'library/music/pause.js',
            args: ''
        },
        queue: {
            enabled: true,
            description: 'Displays queue',
            type: 'music',
            command: 'library/music/queue.js',
            args: ''
        },
        resume: {
            enabled: true,
            description: 'Resumes current song',
            type: 'music',
            command: 'library/music/resume.js',
            args: ''
        },
        volume: {
            enabled: true,
            description: 'Sets the current volume',
            type: 'music',
            command: 'library/music/volume.js',
            args: ['volume']
        },
        clear: {
            enabled: true,
            description: 'Clears messages',
            type: 'mod',
            command: 'library/mod/clear.js',
            args: ['num']
        },
        clearqueue: {
            enabled: true,
            description: 'Clears the queue.',
            type: 'mod',
            command: 'library/mod/clearQueue.js',
            args: ''
        },
        mute: {
            enabled: true,
            description: 'Mutes a user',
            type: 'mod',
            command: 'library/mod/mute.js',
            args: ['user']
        },
        unmute: {
            enabled: true,
            description: 'Unmutes a user',
            type: 'mod',
            command: 'library/mod/unmute.js',
            args: ['user']
        },
        warn: {
            enabled: true,
            description: 'Warns a user',
            type: 'mod',
            command: 'library/mod/warn.js',
            args: ['user']
        }
    }
};
