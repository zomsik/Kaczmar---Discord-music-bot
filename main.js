const{
  Client,
  Attachement,
  Discord
} = require('discord.js')

const bot = new Client();
const ytdl = require("ytdl-core");

const token = '';
const prefix = '!';
var version = '1.0';
var servers = {};

bot.on('ready', () => {
  console.log('gotowy');
})

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");

  switch(args[0]){



    case 'napierdalaj':
      function napierdalaj(connection, message){

        var server = servers[message.guild.id];
        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

        server.dispatcher.on("finish", () => {
          if(server.queue[0]){
            napierdalaj(connection, message);
          }else {
            connection.disconnect();
          }
        });

      }
      
      if(args.length==1){
        var t=5;

        message.channel.startTyping();
        setTimeout(() => { message.channel.send("Tarararara"); 
        message.channel.stopTyping();
        message.channel.startTyping();
        }, 1000*t); 
        t=t+1;

        setTimeout(() => { message.channel.send("Tarararara"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Taarararara"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;       

        setTimeout(() => { message.channel.send("Taarararara"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Ararirarira"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Ararirarira"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1100*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Tara"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1100*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Tara"); 
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1100*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Taraaa"); 
        message.channel.stopTyping();
      }, 1100*t); 

      }


      if(args.length==1){
        args.push('https://www.youtube.com/watch?v=Tqp7boMFGhg');
      }

      if (!message.member.voice.channel){
        message.channel.send("wejdz na kanał, żebym napierdalał");
        return;
      }
      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }

      var server = servers[message.guild.id];


      for(var i=server.queue.length -1; i>=0; i--){
        server.queue.shift();
      }
      server.queue.push(args[1]);

      if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection){
        napierdalaj(connection, message);
      })
      break;


    case 'graj':

      function play(connection, message){
        var server = servers[message.guild.id];

        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();

        server.dispatcher.on("finish", () => {
          if(server.queue[0]){
            play(connection, message);
          }else {
            connection.disconnect();
          }
        });

      }

      if(!args[1]){
        message.channel.send("Ale co mam zagrać?");
        return;
      }
      if (!message.member.voice.channel){
        message.channel.send("Wejdz na kanał, żebym grał");
        return;
      }
      if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection){
        play(connection, message);
      })


      break;

      case 'help':
        const komendy = {
          color: 0x0099ff,
          author: {
            name: 'Komendy kaczmara',
          },
          fields: [
            {
              name: '!napierdalaj',
              value: "Napierdalam dziedzictwo narodowe",
            },
            {
              name: '!napierdalaj <link>',
              value: "Napierdalam coś innego",
            },
            {
              name: '!graj <link>',
              value: "Gram jakiś utwór",
            },
            {
              name: '!skip',
              value: "Pomiń utwór",
            },
            {
              name: '!stop',
              value: "Kończę grać",
            },
            {
              name: '!help',
              value: "Wypisuje znowu to samo",
            },
            {
              name: '!future',
              value: "Wypisuje komendy planowane do dodania",
            },            
          ],
          timestamp: new Date(),
        };
        

        message.channel.send({ embed: komendy });

      break;

      case 'future':
        const komendyfuture = {
          color: 0x00FF00,
          author: {
            name: 'Komendy planowane kaczmara IN FUTURE',
          },
          fields: [
            {
              name: '!pauza',
              value: "Pauzuję granie utworu",
            },
            {
              name: '!volume <0-100>',
              value: "Zmieniam głośność",
            },
            {
              name: '!kolejka',
              value: "Wyświetlam listę utworów, które znajdują się w kolejce",
            },
            {
              name: '!utwory',
              value: "Wyświetlam skróty utworów",
            },
            {
              name: '!<utwór>',
              value: "Gram utwór na podstawie skrótu",
            },
            {
              name: '!tekst <utwór>',
              value: "Wyświetlam tekst utworu",
            },
            {
              name: '!graj <nazwa>',
              value: "Wyszukuję i gram utwór",
            },
            {
              name: '!napierdalaj <nazwa>',
              value: "Wyszukuję i napierdalam utwór",
            },
          ],
          timestamp: new Date(),
        };
        

        message.channel.send({ embed: komendyfuture });

      break;




      case 'skip':
        var server = servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
      break;

      case 'stop':
        var server = servers[message.guild.id];
        if(message.guild.voice.connection){
          for(var i=server.queue.length -1; i>=0; i--){
            server.queue.splice(i,1);
          }
          //server.dispatcher.end();
          message.channel.send("nara")
        }
        if(message.guild.voice.connection) message.guild.voice.connection.disconnect();
      break;
      default:
        if(args[0]=="Lala") message.channel.send("LALA")
        break;

  }


});
bot.login(token);