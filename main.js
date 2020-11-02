const{
  Client,
  Attachement,
  Discord,
  MessageEmbed
} = require('discord.js')
const data = require('./data')
const bot = new Client();
const ytdl = require("ytdl-core");
const YouTube = require("discord-youtube-api");



const prefix = '!';
const youtube = new YouTube(process.env.yttoken);
bot.login(process.env.token);
//bot.login(token);

var version = '1.0';
var servers = {};

bot.on('ready', () => {
  console.log('gotowy');
})

bot.on('message', message => {
  let args = message.content.substring(prefix.length).split(" ");

  switch(args[0]){

    case 'Napierdalaj':
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
      
      if (!message.member.voice.channel){
        message.react('💢');
        message.channel.send("wejdz na kanał, żebym napierdalał");
        return;
      }

      message.react('▶️');


      if(args.length==1){
        var t=3;

        message.channel.startTyping();
        setTimeout(() => { message.channel.send("Tarararara").then(msg => {msg.delete({ timeout: 13000});})
        message.channel.stopTyping();
        message.channel.startTyping();
        }, 800*t); 
        t=t+1;

        setTimeout(() => { message.channel.send("Tarararara").then(msg => {msg.delete({ timeout: 12000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Taarararara").then(msg => {msg.delete({ timeout: 11000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;       

        setTimeout(() => { message.channel.send("Taarararara").then(msg => {msg.delete({ timeout: 10000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Ararirarira").then(msg => {msg.delete({ timeout: 9000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1000*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Ararirarira").then(msg => {msg.delete({ timeout: 8000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1100*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Tara").then(msg => {msg.delete({ timeout: 7000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1100*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Tara").then(msg => {msg.delete({ timeout: 6000});})
        message.channel.stopTyping();
        message.channel.startTyping();
      }, 1100*t); 
      t=t+1;

        setTimeout(() => { message.channel.send("Taraaa").then(msg => {msg.delete({ timeout: 5000});})
        message.channel.stopTyping();
      }, 1100*t); 

      }


      if(args.length==1){
        args.push('https://www.youtube.com/watch?v=Tqp7boMFGhg');
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

    case 'GRAJ':
    case 'Graj':
    case 'graj':
      message.react('▶️');
      function play(connection, message){
        var server = servers[message.guild.id];

        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
        

        server.dispatcher.on("finish", () => {
          server.queue.shift();
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

      case 'Kolejka':
      case 'kolejka':
          if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
          }
  
          var server = servers[message.guild.id];
          message.react('☑️');

          function titleofsong(kols)
          {
            var server = servers[message.guild.id];


            youtube.getVideo(server.queue[kols]).then(video => {

              message.channel.send(kols+1+". " + video.title).then(msg => {msg.delete({ timeout: 30000});})
            
            });
          }


        for(let kol=0;kol<server.queue.length;kol++)
        {

          setTimeout(function () {titleofsong(kol)}, 500*(kol+1));//
      
          if (kol>=9) break;
        }

      break;

      case 'Help':
      case 'help':
        message.react('☑️');
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
              name: '!all',
              value: "Gram wszystkie utwory w losowej kolejności",
            },
            {
              name: '!losuj',
              value: "Gram losowy utwór z bazy dostępnych utworów",
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


      case 'utwory':
        message.react('🎶');
        const utworyembed = {
          color: 0xFFFF00,
          "title": "Pełna lista utworów",
          "url": "https://kaczmar-website.herokuapp.com/",
          author: {
            name: 'Skróty głównych utworów',
          },
          fields: [
            {
              name: '!1788',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!ambasadorowie',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!arka',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!boalkoholizmie',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!bwrzesniowa',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!blogoslawiezlo',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!blues',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!cromwell',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!dwierozmowy',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!dzieci',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!epitafium[j,s,jebaki]',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!grzechy',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!jasio',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!ja',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!jalta',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!kantyczka',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!kara',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!kariera',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!kmicic',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!kniaz',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!korespodencja',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!lekcja',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!limeryki',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!luter',
              value: '\u200b',
              inline: true,
            },
          ],
        };
        const utwory2embed = {
          color: 0xFFFF00,
          fields: [
            {
              name: '!mury[2]',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!naszaklasa[2]',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!oblaw[y,a,a2,a3,a4]',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!opowiesc',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!rejtan',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!requiem',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!sen',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!synagoga',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!spotkanie',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!stworzenie',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!syn',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!wloczedzy',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!wojna',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!wygnanie',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!strumienie',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!zbroja',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!zchlopakrol',
              value: '\u200b',
              inline: true,
            },
            {
              name: '!zrodlo',
              value: '\u200b',
              inline: true,
            },
          ],
          timestamp: new Date(),
        };

        message.channel.send({ embed: utworyembed });
        message.channel.send({ embed: utwory2embed });
      break;

      case 'future':
        message.react('⏳');
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

        case 'Losuj':
        case 'losuj':


          if (!message.member.voice.channel){
            message.channel.send("Wejdz na kanał, żebym grał");
            return;
          }

          if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
          }
          message.react('🆗');

          var server = servers[message.guild.id];
    
          var losuj = Math.floor(Math.random()*data.Utwory.length);

          youtube.getVideo(data.Utwory[losuj][1]).then(video => {
            message.channel.send(`Wylosowano ${video.title}` + " z "+ data.Utwory.length + " wszystkich dostępnych utworów.");
          }).catch(message.channel.send);

          server.queue.push(data.Utwory[losuj][1]);
    
          if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection){
            play(connection, message);
          })



        break;

      case 'All':
      case 'all':
        if (!message.member.voice.channel){
          message.channel.send("Wejdz na kanał, żebym grał");
          return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        }
        message.react('🆗');

        var server = servers[message.guild.id];

        message.channel.send("Odtwarzam w kolejnosci losowej wszystkie " + data.Utwory.length + " dostępne utwory.");
        allsongs= [...data.Utwory];
        //var allsongs = data.Utwory.map(function(arr) {
          //return arr.slice();
        //});



        for (var ran=0;ran<data.Utwory.length;ran++)
        {
          
          var los = Math.floor(Math.random()*allsongs.length);

          
          server.queue.push(allsongs[los][1]);
          allsongs.splice(los,1);


        }

        if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection){
          play(connection, message);
        })

      break;


      case 'Skip':
      case 'skip':

        message.react('⏭️');
        var server = servers[message.guild.id];
        if(!args[1]){
          if(server.dispatcher) server.dispatcher.end();
          return;
        }
        if(server.dispatcher) server.dispatcher.end();
        for (var sk=1;sk<args[1]-1;sk++)
        {
          server.queue.shift();
          if (server.queue.length==0) break;
        }

      break;

      case 'Stop':
      case 'stop':
       
        var server = servers[message.guild.id];
        if(message.guild.voice.connection){
          for(var i=server.queue.length -1; i>=0; i--){
            server.queue.splice(i,1);
          }
          //server.dispatcher.end();
          message.channel.send("nara")
          message.react('⏹️');
        }
        if(message.guild.voice.connection) message.guild.voice.connection.disconnect();
      break;



      default:

        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        }
        
        var server = servers[message.guild.id];

  
        if(args[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")=="nk")
        {
          if (!message.member.voice.channel){
            message.channel.send("Wejdz na kanał, żebym grał");
            return;
          }
          message.react('▶️');
        server.queue.push('https://www.youtube.com/watch?v=aHtEm9sxzYg');
        if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection){
          play(connection, message);
        })
        }


        for (var utw=0;utw<data.Utwory.length;utw++)
        if(args[0].toLowerCase().normalize("NFD").replace(/ł/g,"l").replace(/[\u0300-\u036f]/g, "")==data.Utwory[utw][0])
        {
          if (!message.member.voice.channel){
            message.channel.send("Wejdz na kanał, żebym grał");
            return;
          }


          message.react('▶️');
          server.queue.push(data.Utwory[utw][1]);
    
          if(!message.guild.voiceChannel) message.member.voice.channel.join().then(function(connection){
            play(connection, message);
          })


          break;
        }



        break;

  }

});
