const { Client } = require("discord.js-selfbot-v13");
const { token } = require("./config");
const readyHandler = require("./handlers/ready");
const messageCreateHandler = require("./handlers/messageCreate");
const commandHandler = require("./handlers/commandHandler");
const crashHandler = require("./handlers/crash-handler");
const { targetServerID } = require("./handlers/check");
const axios = require('axios');


const client = new Client();
readyHandler(client);
messageCreateHandler(client);
crashHandler(client);
commandHandler.loadCommands(client);

client.once("ready", async () => {
  console.log("Logged in successfully.");


  setImmediate(() => {
    if (client.guilds.cache.has(targetServerID)) {
      console.log("Account is joined to server.");
    } else {
      console.log("Account is not joined in our server click here to join https://dsc.gg/zenithsenpai/.");
      client.destroy();
    }
  });
});

client.login(token).catch(console.error);


// ███████╗███████╗███╗░░██╗██╗████████╗██╗░░██╗░██████╗███████╗███╗░░██╗██████╗░░█████╗░██╗ //
// ╚════██║██╔════╝████╗░██║██║╚══██╔══╝██║░░██║██╔════╝██╔════╝████╗░██║██╔══██╗██╔══██╗██║ //
// ░░███╔═╝█████╗░░██╔██╗██║██║░░░██║░░░███████║╚█████╗░█████╗░░██╔██╗██║██████╔╝███████║██║ //
// ██╔══╝░░██╔══╝░░██║╚████║██║░░░██║░░░██╔══██║░╚═══██╗██╔══╝░░██║╚████║██╔═══╝░██╔══██║██║ //
// ███████╗███████╗██║░╚███║██║░░░██║░░░██║░░██║██████╔╝███████╗██║░╚███║██║░░░░░██║░░██║██║ //
// ╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝╚═╝ //

// was here.. 
