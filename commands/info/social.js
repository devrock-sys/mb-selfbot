const config = require('../../config'); // Correct the relative path


module.exports = {
    name: 'social',
    description: 'Displays the user\'s social media links.',
    /**
     * Executes the social command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    execute(channel, message, client, args) {
        // Delete the command message
        message.delete().catch(console.error);

        // Fetch social links from config
        const { telegram, discord, instagram } = config.socialLinks;

        // Define the social media links message
        const socialLinksMessage = `
        📱 **Follow me on my Socials** 📱

        ✈️ Telegram: [Telegram](${telegram})
        🛠️ Discord: **${discord}**
        📸 Instagram: [Instagram](${instagram})
        `;

        // Send the social media links message
        message.channel.send(socialLinksMessage).catch(console.error);
    }
};
