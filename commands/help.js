const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    execute(channel, message, client, args) {
        message.delete().catch(err => console.error('Failed to delete message:', err));

        const { prefix } = require('../config');
        const baseDir = path.resolve(__dirname, '../commands');

        const readCommands = (dir) => {
            return fs.readdirSync(dir).filter(file => file.endsWith('.js')).map(file => require(path.join(dir, file)));
        };

        let helpMessage = `**📜 INT ROCK V1 S3LF BOT 📜**\n\n`;

        // Read and display commands from the root /commands directory
        const rootCommands = readCommands(baseDir);
        if (rootCommands.length > 0) {
            helpMessage += `**Root Commands**\n\n`;
            rootCommands.forEach(command => {
                helpMessage += `➡️ **${prefix}${command.name}**: ${command.description}\n`;
            });
            helpMessage += `\n`;
        }

        // Read and display commands from subdirectories
        const commandCategories = fs.readdirSync(baseDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
        commandCategories.forEach(categoryDir => {
            const category = categoryDir.name;
            const commandsInCategory = readCommands(path.join(baseDir, category));
            if (commandsInCategory.length > 0) {
                helpMessage += `**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n\n`;
                commandsInCategory.forEach(command => {
                    helpMessage += `➡️ **${prefix}${command.name}**: ${command.description}\n`;
                });
                helpMessage += `\n`;
            }
        });

        helpMessage += `\n*made by dev*`;

        const messageChunks = helpMessage.match(/[\s\S]{1,2000}/g);

        if (messageChunks.length > 1) {
            messageChunks.forEach(chunk => {
                channel.send(chunk).catch(err => console.error('Failed to send help message:', err));
            });
        } else {
            channel.send(helpMessage).catch(err => console.error('Failed to send help message:', err));
        }
    }
};
