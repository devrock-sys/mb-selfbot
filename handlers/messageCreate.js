const commandHandler = require('./commandHandler');
const afkCommand = require('../commands/afk');
const config = require('../config');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (!message.author || message.author.bot) return;

        const { prefix, allowedUserIDs, allowedNoPrefixUserIDs } = config;
        const content = message.content.trim();
        const isPrefixed = content.startsWith(prefix);

        // AFK mentions handling
        const afkUsers = afkCommand.getAfkUsers();
        if (message.mentions.users.size > 0) {
            message.mentions.users.forEach((user) => {
                if (afkUsers[user.id]) {
                    message.channel.send(`${afkUsers[user.id]}`);
                }
            });
        }

        // Handle DMs for AFK status
        if (message.channel.type === 'dm' && afkUsers[message.author.id]) {
            message.reply(`${afkUsers[message.author.id]}`);
            return;
        }

        // Command execution
        const commandName = isPrefixed
            ? content.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
            : content.split(/ +/).shift().toLowerCase();

        const command = commandHandler.getCommand(commandName);
        if (!command) return;

        if (!allowedUserIDs.includes(message.author.id)) {
            return message.channel.send("You are not allowed to use this command.");
        }

        const args = isPrefixed
            ? content.slice(prefix.length).trim().split(/ +/).slice(1)
            : content.split(/ +/).slice(1);

        if (!isPrefixed && !allowedNoPrefixUserIDs.includes(message.author.id)) {
            return message.channel.send("You are not allowed to use commands without a prefix.");
        }

        try {
            await command.execute(message.channel, message, client, args);
            console.log(`Executed command: ${commandName}`);
        } catch (error) {
            console.error(`Error executing command: ${commandName}`, error);
            message.channel.send("There was an error executing that command.");
        }
    });
};
