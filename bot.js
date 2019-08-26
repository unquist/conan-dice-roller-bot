const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === '/roll') {
    //message.reply('Critical fail');
    message.channel.send('FAIL');
  }
});

console.log(`AUTH token:` + process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);
