"use strict";
const Discord = require('discord.js'),
config = require('../../privconfig.js');

module.exports = {
    channelCreate: async (channel) => {
        if (channel.type === 'dm') return;
        if (!config.servers[channel.guild.id].logs.channelCreate) return;
        channel.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setThumbnail(channel.guild.iconURL())
            .setDescription(`Channel Created: ${channel.name}`)
            .setTimestamp()
            .setColor('#23d160'));
    },
    channelDelete: async (channel) => {
        if (channel.type === 'dm') return;
        if (!config.servers[channel.guild.id].logs.channelDelete) return;
        channel.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setThumbnail(channel.guild.iconURL())
            .setDescription(`Channel Deleted: ${channel.name}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    channelPinsUpdate: async (channel, time) => {

    },
    channelUpdate: async (oldChannel, newChannel) => {

    },
    emojiCreate: async (emoji) => {

    },
    emojiDelete: async (emoji) => {

    },
    emojiUpdate: async (oldEmoji, newEmoji) => {

    },
    guildBanAdd: async (guild, user) => {
        if (!config.servers[guild.id].logs.guildBanAdd) return;
        guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Banned', user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
            .setFooter(`User ID: ${user.id}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    guildBanRemove: async (guild, user) => {
      if (!config.servers[guild.id].logs.guildBanRemove) return;
        guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Unbanned', user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
            .setFooter(`User ID: ${user.id}`)
            .setTimestamp()
            .setColor('#117ea6'));
    },
    guildIntegrationsUpdate: async guild => {

    },
    guildMemberAdd: async (member) => {
        if (config.servers[member.guild.id].joinMessage !== '') member.guild.channels.find(channel => channel.name === config.servers[member.guild.id].joinMessageChannel).send(config.servers[member.guild.id].joinMessage);
        config.servers[member.guild.id].onJoinRoles.forEach((r) => {
            //member.addRole(member.guild.roles.find((role) => role.name === r).id).catch(console.error);
        });
        if (!config.servers[member.guild.id].logs.guildMemberAdd) return;
        member.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Joined', member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`<@${member.user.id}> ${member.user.username}#${member.user.discriminator}`)
            .setFooter(`User ID: ${member.user.id}`)
            .setTimestamp()
            .setColor('#23d160'));
    },
    guildMemberAvailable: async (member) => {

    },
    guildMemberRemove: async (member) => {
        if (!config.servers[member.guild.id].logs.guildMemberRemove) return;
        member.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Left', member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`<@${member.user.id}> ${member.user.username}#${member.user.discriminator}`)
            .setFooter(`User ID: ${member.user.id}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    guildMembersChunk: async (members, guild) => {

    },
    guildMemberSpeaking: async (member, speaking) => {

    },
    guildMemberUpdate: async (oldMember, newMember) => {

    },
    guildUpdate: async (oldGuild, newGuild) => {

    },
    messageDelete: async (message) => {
        if (!config.servers[message.guild.id].logs.messageDelete) return;
        if (message.channel.type === 'dm') return;
        message.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
            .setDescription(`**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n${message.content}`)
            .setFooter(`User ID: ${message.author.id}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    messageDeleteBulk: async (messages) => {
        if (!config.servers[messages.first().guild.id].logs.messageDeleteBulk) return;
        messages.first().guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Bulk Message Delete', messages.first().guild.iconURL())
            .setDescription(`${messages.size} Messages deleted in ${messages.first().channel.name}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    messageReactionAdd: async (messageReaction, user) => {
        //if (!config.servers[messageReaction.message.guild.id].logs.messageReactionAdd) return;
        switch(messageReaction.emoji.name) {
            case '⭐':
                let starBoardHasMessage = false;
                await messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').messages.fetch()
                    .then((messages) => {
                        messages.forEach((message) => {
                            if (message.embeds[0].footer.text.split(' | ')[1] === messageReaction.message.id) starBoardHasMessage = true;
                        });
                    });
                if (messageReaction.count === config.starboardStars && !starBoardHasMessage) messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').send(new Discord.MessageEmbed()
                    .setColor(0x00FF00)
                    .setAuthor(`${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL())
                    .setFooter(`${messageReaction.message.reactions.find((reaction) => messageReaction.emoji.name === '⭐').count}⭐ | ${messageReaction.message.id}`)
                    .addField('Channel', messageReaction.message.channel)
                    .addField('Message', `[${messageReaction.message.content !== '' ? messageReaction.message : 'Jump To'}](${messageReaction.message.url})`)
                    .setImage(messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : ''));
                else {
                    await messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').messages.fetch()
                        .then((messages) => {
                            messages.forEach((message) => {
                                if (message.embeds[0].footer.text.split(' | ')[1] === messageReaction.message.id) message.edit(new Discord.MessageEmbed()
                                    .setColor(0x00FF00)
                                    .setAuthor(`${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL())
                                    .setFooter(`${messageReaction.message.reactions.find((reaction) => reaction.emoji.name === '⭐').count}⭐ | ${messageReaction.message.id}`)
                                    .addField('Channel', messageReaction.message.channel)
                                    .addField('Message', `[${messageReaction.message.content !== '' ? messageReaction.message : 'Jump To'}](${messageReaction.message.url})`)
                                    .setImage(messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : ''));
                            });
                        });
                }
                break;
        }
    },
    messageReactionRemove: async (messageReaction, user) => {
      //if (!config.servers[messageReaction.message.guild.id].logs.messageReactionRemove) return;
        switch(messageReaction.emoji.name) {
            case '⭐':
                await messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').messages.fetch()
                    .then((messages) => {
                        messages.forEach((message) => {
                            if (message.embeds[0].footer.text.split(' | ')[1] === messageReaction.message.id) {
                                if (messageReaction.message.reactions.find((reaction) => messageReaction.emoji.name === '⭐')) message.edit(new Discord.MessageEmbed()
                                    .setColor(0x00FF00)
                                    .setAuthor(`${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL())
                                    .setFooter(`${messageReaction.message.reactions.find((reaction) => messageReaction.emoji.name === '⭐').count}⭐ | ${messageReaction.message.id}`)
                                    .addField('Channel', messageReaction.message.channel)
                                    .addField('Message', `[${messageReaction.message.content !== '' ? messageReaction.message : 'Jump To'}](${messageReaction.message.url})`)
                                    .setImage(messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : ''));
                                else message.edit(new Discord.MessageEmbed()
                                    .setColor(0x00FF00)
                                    .setAuthor(`${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL())
                                    .setFooter(`0⭐ | ${messageReaction.message.id}`)
                                    .addField('Channel', messageReaction.message.channel)
                                    .addField('Message', `[${messageReaction.message.content !== '' ? messageReaction.message : 'Jump To'}](${messageReaction.message.url})`)
                                    .setImage(messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : ''));
                                }
                        });
                    });
                break;
        }
    },
    messageReactionRemoveAll: async (message) => {

    },
    messageUpdate: async (oldMessage, newMessage) => {
        if (oldMessage.channel.type === 'dm') return;
        if (oldMessage.content === '' || newMessage.content === '') return;
        if (oldMessage.content === newMessage.content) return;
        if (config.bannedStrings.findIndex((e) => newMessage.content.includes(e)) >= 0) return newMessage.delete();
        if (!config.servers[oldMessage.guild.id].logs.messageUpdate) return;
        oldMessage.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.displayAvatarURL())
            .addField('Before', oldMessage.content || 'none')
            .addField('After', newMessage.content || 'none')
            .setFooter(`User ID: ${oldMessage.author.id}`)
            .setTimestamp()
            .setColor('#117ea6'));
    },
    presenceUpdate: async (oldPresence, newPresence) => {

    },
    roleCreate: async (role) => {
        if (!config.servers[role.guild.id].logs.roleCreate) return;
        role.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(role.guild.name, role.guild.iconURL())
            .setDescription(`Role Created: ${role.name}`)
            .setTimestamp()
            .setColor('#23d160'));
    },
    roleDelete: async (role) => {
        if (!config.servers[role.guild.id].logs.roleDelete) return;
        role.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(role.guild.name, role.guild.iconURL())
            .setDescription(`Role Deleted: ${role.name}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    roleUpdate: async (oldRole, newRole) => {

    },
    typingStart: async (channel, user) => {

    },
    typingStop: async (channel, user) => {

    },
    userUpdate: async (oldUser, newUser) => {

    },
    voiceStateUpdate: async (oldState, newState) => {

    },
    webhookUpdate: async (channel) => {

    },
};
