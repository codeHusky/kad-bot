var servers = require('./servers.js');
module.exports = {
    prefix: 'k!',
    starboardStars: 7,
    token: process.env.BOT_TOKEN,
    keys: {
        key: '',
        secret: ''
    },
    ytKey: '',
    callbackURL: 'https://localhost/login',
    servers: servers,
    bannedStrings: []
};
