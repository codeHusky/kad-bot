"use strict";
const Discord = require('discord.js'),
    OAuth1Client = require("oauth-1-client"),
    express = require('express'),
    sqlite3 = require('sqlite3'),
    commandList = require('../commands/index.js'),
    eventHandlers = require('../modules/eventHandlers.js'),
    music = require('../modules/music.js'),
    whiteList = ['419151003766620180'],
    blackList = [];

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
        this.users = {};
        this.db = new sqlite3.Database('./source/databases/general.db', (err) => {
            if (err) console.error(err.message);
            console.log('Connected to the general database.');
        });
    }

    async init() {
        this.webClient.engine('html', require('ejs').renderFile);
        this.webClient.set('views', '.');
        this.webClient.use(express.static("source"));
        this.webClient.get('/', async (req, res) => res.render('source/html/index.html'));
        this.webClient.get('/login/', (req, res) => this.userLogin(req, res));
        this.webClient.listen(80, () => console.log(`Web client open on port 80!`));
        this.client.login(this.config.token);
        this.client.on('error', console.error);
        this.client.on('ready', async () => {
            this.client.user.setActivity(`${this.config.prefix}help`, {url: 'https://www.twitch.tv/sharkfinpro', type: 'STREAMING'});
            console.log(`Logged in as ${this.client.user.tag}`);
        });
        this.client.on('raw', async (event) => {
            if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {
                const { d: data } = event;
                const channel = this.client.channels.get(data.channel_id);
                if (channel.messages.has(data.message_id)) return;
                const message = await channel.messages.fetch(data.message_id);
                this.client.emit(event.t === 'MESSAGE_REACTION_ADD' ? 'messageReactionAdd' : 'messageReactionRemove', message.reactions.get(data.emoji.id || data.emoji.name), this.client.users.get(data.user_id));
            }
        });
        this.client.on('message', (message) => this.onMessage(message));
        this.client.on('channelCreate', async (channel) => eventHandlers.channelCreate(channel));
        this.client.on('channelDelete', async (channel) => eventHandlers.channelDelete(channel));
        this.client.on('channelPinsUpdate', async (channel, time) => eventHandlers.channelPinsUpdate(channel, time));
        this.client.on('channelUpdate', async (oldChannel, newChannel) => eventHandlers.channelUpdate(oldChannel, newChannel));
        this.client.on('emojiCreate', async (emoji) => eventHandlers.emojiCreate(emoji));
        this.client.on('emojiDelete', async (emoji) => eventHandlers.emojiDelete(emoji));
        this.client.on('emojiUpdate', async (oldEmoji, newEmoji) => eventHandlers.emojiUpdate(oldEmoji, newEmoji));
        this.client.on('guildBanAdd', async (guild, user) => eventHandlers.guildBanAdd(guild, user));
        this.client.on('guildBanRemove', async (guild, user) => eventHandlers.guildBanRemove(guild, user));
        this.client.on('guildIntegrationsUpdate', async (guild) => eventHandlers.guildIntegrationsUpdate(guild));
        this.client.on('guildMemberAdd', async (member) => eventHandlers.guildMemberAdd(member));
        this.client.on('guildMemberAvailable', async (member) => eventHandlers.guildMemberAvailable(member));
        this.client.on('guildMemberRemove', async (member) => eventHandlers.guildMemberRemove(member));
        this.client.on('guildMembersChunk', async (members, guild) => eventHandlers.guildMembersChunk(members, guild));
        this.client.on('guildMemberSpeaking', async (member, speaking) => eventHandlers.guildMemberSpeaking(member, speaking));
        this.client.on('guildMemberUpdate', async (oldMember, newMember) => eventHandlers.guildMemberUpdate(oldMember, newMember));
        this.client.on('guildUpdate', async (oldGuild, newGuild) => eventHandlers.guildUpdate(oldGuild, newGuild));
        this.client.on('messageDelete', async (message) => eventHandlers.messageDelete(message));
        this.client.on('messageDeleteBulk', async (messages) => eventHandlers.messageDeleteBulk(messages));
        this.client.on('messageReactionAdd', async (messageReaction, user) => eventHandlers.messageReactionAdd(messageReaction, user));
        this.client.on('messageReactionRemove', async (messageReaction, user) => eventHandlers.messageReactionRemove(messageReaction, user));
        this.client.on('messageReactionRemoveAll', async (message) => eventHandlers.messageReactionRemoveAll(message));
        this.client.on('messageUpdate', async (oldMessage, newMessage) => eventHandlers.messageUpdate(oldMessage, newMessage));
        this.client.on('presenceUpdate', async (oldPresence, newPresence) => eventHandlers.presenceUpdate(oldPresence, newPresence));
        this.client.on('roleCreate', async (role) => eventHandlers.roleCreate(role));
        this.client.on('roleDelete', async (role) => eventHandlers.roleDelete(role));
        this.client.on('roleUpdate', async (oldRole, newRole) => eventHandlers.roleUpdate(oldRole, newRole));
        this.client.on('typingStart', async (channel, user) => eventHandlers.typingStart(channel, user));
        this.client.on('typingStop', async (channel, user) => eventHandlers.typingStop(channel, user));
        this.client.on('userUpdate', async (oldUser, newUser) => eventHandlers.userUpdate(oldUser, newUser));
        this.client.on('voiceStateUpdate', async (oldState, newState) => eventHandlers.voiceStateUpdate(oldState, newState));
        this.client.on('webhookUpdate', async (channel) => eventHandlers.webhookUpdate(channel));
    }

    userLogin(req, res) {
        res.render('source/html/login.html');
        const { query } = req;
        if (!query) return;
        let id;
        for (let i in this.users) if (this.users[i].request_token === query.oauth_token) id = i;
        if (!id) return;
        this.users[id].oauth_verifier = query.oauth_verifier;
        this.oauthClient.accessToken(query.oauth_token, query.oauth_token_secret, query.oauth_verifier)
            .then((tokens) => {
                let { token, tokenSecret } = tokens;
                this.users[id].request_token_secret = tokenSecret;
                this.oauthClient.auth(token, tokenSecret)
                    .get("/api/v1/user", { casing: "camel" })
                    .then((response) => {
                        this.db.serialize(() => {
                            this.db.all('SELECT * FROM users', async (err, data) => {
                                let f;
                                await data.forEach((d) => {
                                    if(d.id === id) return f = true;
                                });
                                if (!f) this.db.run('INSERT into users VALUES ($id, $token, $secret, $kaid, $oauth_last_update, $points, $private)', id, token, tokenSecret, response.body.kaid, new Date().toString(), 0, 0);
                                else this.db.run("UPDATE users SET token = '" + token + "', secret = '" + tokenSecret + "', oauth_last_update = '" + (new Date().toString()) + "' WHERE id = " + id);
                                this.db.each('SELECT * FROM users', (err, row) => {
                                    console.log(row);
                                });
                            });
                        });
                    });
            });
    }

    onMessage(message) {
        if (message.channel.type !== 'text') return;
        if (message.author.bot) return;
        //if (!whiteList.includes(message.author.id)) return;
        if (blackList.includes(message.author.id)) return;
        if (this.config.bannedStrings.findIndex((e) => message.content.includes(e)) >= 0) return message.delete();
        if (message.mentions.users.has(this.client.user.id)) message.react('🤔');
        if (message.content === '<@483103420212051980> help') return require('../commands/' + commandList['help'].command)(message, commandList, this.config, this);
        if (!message.content.toLowerCase().startsWith(this.config.prefix)) return;
        const command = message.content.toLowerCase().split(' ')[0].substring(this.config.prefix.length, message.content.toLowerCase().split(' ')[0].length);
        if (Object.keys(commandList).includes(command)) {
            if (!this.config.servers[message.guild.id].commands[command] || !commandList[command].enabled) return message.reply(`${this.config.prefix}**${command}** is currently disabled!`);
            require('../commands/'+commandList[command].command)(message, commandList, this.config, this);
        } else message.react('❌');
    }
};
process.on('exit', (e) => console.log(`Process exited with code ${e}`));
