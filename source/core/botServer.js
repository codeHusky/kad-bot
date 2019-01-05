"use strict";
const Discord = require('discord.js'),
    OAuth1Client = require("oauth-1-client"),
    util = require('util'),
    express = require('express'),
    pg = require('pg'),
    commandList = require('../commands/index.js'),
    eventHandlers = require('../modules/eventHandlers.js'),
    music = require('../modules/music.js');

module.exports = class botServer {
    constructor(config) {
        this.config = config;
        this.client = new Discord.Client();
        this.music = new music();
        this.oauthClient = new OAuth1Client({
            key: this.config.keys.key,
            secret: this.config.keys.secret,
            callbackURL: this.config.callbackURL,
            requestUrl: `https://www.khanacademy.org/api/auth2/request_token?oauth_callback=${this.config.callbackURL}`,
            accessUrl: `https://www.khanacademy.org/api/auth2/access_token`,
            apiHostName: 'www.khanacademy.org'
        });
        this.webClient = express();
    }

    async init() {
        this.webClient.engine('html', require('ejs').renderFile);
        this.webClient.set('views', '.');
        this.webClient.use(express.static("source"));
        this.webClient.get('/', async (req, res) => res.render('source/html/index.html'));
        this.webClient.get('/login/', async (req, res) => {
            console.log('connection')
            try{
                res.render('source/html/login.html')
                const { query } = req;
                await this.oauthClient.accessToken(query.oauth_token, query.oauth_token_secret, query.oauth_verifier)
                    .then(async tokens => {
                        await this.oauthClient.auth(tokens.token, tokens.tokenSecret)
                            .get("/api/v1/user", { casing: "camel" })
                            .then(async response => {
                                console.log(response)
                            })
                    })
            } catch(e) {
                console.log(e)
            }
        });
        this.webClient.listen(process.env.PORT || 80, () => console.log(`Web client open on port ${process.env.PORT || 80}!`));
        this.client.login(this.config.token);
        this.client.on('error', error => console.log(error));
        this.client.on('ready', async => {
            this.client.user.setActivity(`with ${this.config.prefix}help`, { type: 'PLAYING' })
            console.log(`Logged in as ${this.client.user.tag}`)
            setInterval(() => {
                this.client.guilds.get('528076719694020629').channels.find(channel => channel.name === 'keep-alive').send('ping')
            }, 1000 * 15);
        });
        this.client.on('raw', async event => {
            if (event.t == 'MESSAGE_REACTION_ADD') {
                const { d: data } = event;
                const channel = this.client.channels.get(data.channel_id);
                if (channel.messages.has(data.message_id)) return
                const message = await channel.messages.fetch(data.message_id);
                this.client.emit('messageReactionAdd', message.reactions.get(data.emoji.id || data.emoji.name), this.client.users.get(data.user_id));
            }
            if (event.t == 'MESSAGE_REACTION_REMOVE') {
                const { d: data } = event;
                const channel = this.client.channels.get(data.channel_id);
                if (channel.messages.has(data.message_id)) return
                const message = await channel.messages.fetch(data.message_id);
                this.client.emit('messageReactionRemove', message.reactions.get(data.emoji.id || data.emoji.name), this.client.users.get(data.user_id));
            }
        });
        this.client.on('message', message => this.onMessage(message));
        this.client.on('channelCreate', async channel => eventHandlers.channelCreate(channel));
        this.client.on('channelDelete', async channel => eventHandlers.channelDelete(channel));
        this.client.on('channelPinsUpdate', async (channel, time) => eventHandlers.channelPinsUpdate(channel, time));
        this.client.on('channelUpdate', async (oldChannel, newChannel) => eventHandlers.channelUpdate(oldChannel, newChannel));
        this.client.on('emojiCreate', async emoji => eventHandlers.emojiCreate(emoji));
        this.client.on('emojiDelete', async emoji => eventHandlers.emojiDelete(emoji));
        this.client.on('emojiUpdate', async (oldEmoji, newEmoji) => eventHandlers.emojiUpdate(oldEmoji, newEmoji));
        this.client.on('guildBanAdd', async (guild, user) => eventHandlers.guildBanAdd(guild, user));
        this.client.on('guildBanRemove', async (guild, user) => eventHandlers.guildBanRemove(guild, user));
        this.client.on('guildIntegrationsUpdate', async (guild) => eventHandlers.guildIntegrationsUpdate(guild));
        this.client.on('guildMemberAdd', async member => eventHandlers.guildMemberAdd(member));
        this.client.on('guildMemberAvailable', async member => eventHandlers.guildMemberAvailable(member));
        this.client.on('guildMemberRemove', async member => eventHandlers.guildMemberRemove(member));
        this.client.on('guildMembersChunk', async (members, guild) => eventHandlers.guildMembersChunk(members, guild));
        this.client.on('guildMemberSpeaking', async (member, speaking) => eventHandlers.guildMemberSpeaking(member, speaking));
        this.client.on('guildMemberUpdate', async (oldMember, newMember) => eventHandlers.guildMemberUpdate(oldMember, newMember));
        this.client.on('guildUpdate', async (oldGuild, newGuild) => eventHandlers.guildUpdate(oldGuild, newGuild));
        this.client.on('messageDelete', async message => eventHandlers.messageDelete(message));
        this.client.on('messageDeleteBulk', async messages => eventHandlers.messageDeleteBulk(messages));
        this.client.on('messageReactionAdd', async (messageReaction, user) => eventHandlers.messageReactionAdd(messageReaction, user));
        this.client.on('messageReactionRemove', async (messageReaction, user) => eventHandlers.messageReactionRemove(messageReaction, user));
        this.client.on('messageReactionRemoveAll', async message => eventHandlers.messageReactionRemoveAll(message));
        this.client.on('messageUpdate', async (oldMessage, newMessage) => eventHandlers.messageUpdate(oldMessage, newMessage));
        this.client.on('presenceUpdate', async (oldPresence, newPresence) => eventHandlers.presenceUpdate(oldPresence, newPresence));
        this.client.on('roleCreate', async role => eventHandlers.roleCreate(role));
        this.client.on('roleDelete', async role => eventHandlers.roleDelete(role));
        this.client.on('roleUpdate', async (oldRole, newRole) => eventHandlers.roleUpdate(oldRole, newRole));
        this.client.on('typingStart', async (channel, user) => eventHandlers.typingStart(channel, user));
        this.client.on('typingStop', async (channel, user) => eventHandlers.typingStop(channel, user));
        this.client.on('userUpdate', async (oldUser, newUser) => eventHandlers.userUpdate(oldUser, newUser));
        this.client.on('voiceStateUpdate', async (oldState, newState) => eventHandlers.voiceStateUpdate(oldState, newState));
        this.client.on('webhookUpdate', async channel => eventHandlers.webhookUpdate(channel));
    }

    onMessage(message) {
        if (message.author.bot) return
        if (message.mentions.users.has(this.client.user.id)) message.react('🤔')
        if (message.content === '<@483103420212051980> help') return require('../commands/' + commandList['help'].command)(message, commandList, this.config, this)
        if (!message.content.toLowerCase().startsWith(this.config.prefix)) return
        const command = message.content.toLowerCase().split(' ')[0].substring(this.config.prefix.length, message.content.toLowerCase().split(' ')[0].length)
        if(Object.keys(commandList).includes(command)) {
            if(!commandList[command].enabled) return message.reply(`${this.config.prefix}**${command}** is currently disabled!`)
            require('../commands/'+commandList[command].command)(message, commandList, this.config, this)
        } else message.react('❌')
    }
}
