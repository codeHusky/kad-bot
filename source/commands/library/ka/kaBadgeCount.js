"use strict";
const request = require('request');
module.exports = (message, commandList, config, server) => {
    request('https://www.khanacademy.org/api/v1/badges', (error, response, body) => message.channel.send(`Khan Academy currently has ${body.length} badges.`));
};
