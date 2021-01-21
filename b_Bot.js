var Discord = require("discord.io");
var auth = require("./auth.json");
var bigInt = require("big-integer");


// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on("ready", function (evt) {
    console.log("Connected");
    bot.setPresence( {game: {name:"%help for help"}} );
});

bot.on("message", function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == "%") {
        console.log(message);
        var args = message.slice(1).split(" ");
        console.log(args);
        var cmd = args[0];
        console.log(`ARG1111: ${args[1]}`);
                
       
        // args = args.splice(1);
        if (cmd == "ping") {
            bot.sendMessage({
                to: channelID,
                message: "Pong!"
            });

        } else if (cmd == "hi") {
            bot.sendMessage({
                to: channelID,
                message: "Hello"
            });
        } else if (cmd == "echo") {
            bot.sendMessage({
                to: channelID,
                message: args[1]
            });
        } else if (cmd == "unicode") {
            var the_text = "";
            for (i = 1; i < args.length; i++) {
                the_text += String.fromCodePoint(parseInt(args[i], 16));
            }
            console.log(`ARG 1: ${args[1]}`)
            bot.sendMessage({
                to: channelID,
                message: the_text
                    
            });
        } else if (cmd == "+") {
            bot.sendMessage({
                to: channelID,
                message: bigInt(args[1]).add(bigInt(args[2]))
            });
        
        } else if (cmd =="-") {
            bot.sendMessage({
                to: channelID,
                message: bigInt(args[1]).subtract(bigInt(args[2]))
            });
        } else if (cmd == "*") {
            bot.sendMessage({
                to: channelID,
                message: bigInt(args[1]).multiply(bigInt(args[2]))
            })
        } else if (cmd == "/") {
            bot.sendMessage({
                to: channelID,
                message: parseInt(args[1]) / parseInt(args[2])
            });
        } else if (cmd == "^") {
            bot.sendMessage({
                to: channelID,
                message: bigInt(args[1]).pow(bigInt(args[2]))
            });
        } else if (cmd == "help") {
            bot.sendMessage({
                to: channelID,
                message: "",
                embed: {
                    color: 16711680,
                    title: "List of commands",
                    description: "Put % in front of all commands",
                    fields: [
                        {
                            name: "ping",
                            value: "return pong.",
                            inline: false
                        },

                        {
                            name: "hi",
                            value: "Say hello.",
                            inline: false
                        },

                        {
                            name: "unicode",
                            value: "Translate a series of space-separated code points into a string.",
                            inline: false
                        },

                        {
                            name: "help",
                            value: "Bring up this message.",
                            inline: false
                        },

                        {
                            name: "One of +-*/^",
                            value: "Perform that operation on two space-separated numbers.",
                            inline: false
                        }

                    ],

                    url: "https://github.com/OtterTheBear/b_Bot.js",
                    footer: {
                        text: "https://github.com/OtterTheBear/b_Bot.js",
                        icon_url: "https://github.com/OtterTheBear/b_Bot.js"
                    }

                }

            });
        }
     }
});
