module.exports = (client) => {
    client.on('ready', () => {
        // Log basic "Logged in as" message without ASCII art
        console.log(`Logged in as: ${client.user.tag}`);

        // Log bot status information
        console.log('Bot is now active!');
        console.log(`Guilds: ${client.guilds.cache.size}`);
        console.log(`Channels: ${client.channels.cache.size}`);
        console.log(`Users: ${client.users.cache.size}`);
    });
};
