"use strict";

var Discord = require("discord.js");

var client = new Discord.Client();
var prefix = '-';
client.once('ready', function () {
  console.log("zomsik is online!");
});
client.on('message', function (message) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  var args = message.content.slice(prefix.length).split(/ +/);
  var command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('pong!');
  }
});
client.login("NzcxNTA2NjYxNzYwMTcyMDUz.X5tHkg.5UDPTYJNSFDBr_4uQjsWSpoJV0I");