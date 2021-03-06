const Discord = require('discord.js');

const send = require(`${__dirname}/../../tools/send`);

module.exports = {
	name: "devhelp",
	aliases: ["devcommands", "cheatcommands"],
	developerOnly: true,
	execute: async function(message) {

		const embed = new Discord.MessageEmbed()
			.setTitle("Developer Commands")
			.setDescription("Remember that misusing these commands *will* temporarily take away your toolbox. They are also logged in an admin channel.")
			.addField("Commands", "`c!devhelp` get a full list of dev commands\n`c!resetbal [user]` reset a user's cent balance\n`c!addcents [user]` add cents to a user's balance\n`c!additem <item obj ID> <amount> [user]` set a user's item count\n`c!ban <user> <true or false> [reason]` ban a user from the bot\n`c!givebadge <badge obj ID> [user]` give a user a badge\n`c!donator <0, 1, or 2> [user]` set the donator status of a user\n`c!givebug [user]` give a user a bug\n`c!takebug [user]` take a bug from a user\n`c!bugs` view the amount of bugs a user has")
			.setColor('GREEN');

		send.sendChannel({ channel: message.channel, author: message.author }, { embeds: [embed] });

	}
};