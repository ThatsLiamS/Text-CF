const Discord = require('discord.js');

const checkGuild = require(`${__dirname}/../../tools/checkGuild`);
const send = require(`${__dirname}/../../tools/send`);

module.exports = {
	name: "serveraddons",
	description: "Get a list of the server's addons!",
	argument: "None",
	perms: "Embed Links",
	tips: "Custom addons have to be enabled to use this",
	execute: async function(message, args, prefix, client, [firebase]) {

		await checkGuild(firebase, message.guild.id);
		let guilddata = await firebase.doc(`/guilds/${message.guild.id}`).get();
		if (guilddata.data().enabled.customaddons == false) return;

		let guildData = guilddata.data();
		if (guildData.serveraddons === undefined) {
			guildData.serveraddons = {
				first: {
					name: "none",
					description: "none",
					published: false,
					author: 0
				},

				second: {
					name: "none",
					description: "none",
					published: false,
					author: 0
				},
				third: {
					name: "none",
					description: "none",
					published: false,
					author: 0
				}
			};
		}

		let sad = guildData.serveraddons;
		const embed = new Discord.MessageEmbed()
			.setTitle(`${message.guild.name}'s Server Addons:`)
			.setColor('YELLOW');
		let noAddons = true;
		if (sad.first.name.toLowerCase() != "none") {
			noAddons = false;
			let responses = sad.first.responses;
			if (responses) responses = sad.first.responses.length;
			else responses = 0;
			embed.addField(sad.first.name, `Description: ${sad.first.description}\nResponses: ${responses}`);
		}
		if (sad.second.name.toLowerCase() != "none") {
			noAddons = false;
			let responses = sad.second.responses;
			if (responses) responses = sad.second.responses.length;
			else responses = 0;
			embed.addField(sad.second.name, `Description: ${sad.second.description}\nResponses: ${responses}`);
		}
		if (sad.third.name.toLowerCase() != "none") {
			noAddons = false;
			let responses = sad.third.responses;
			if (responses) responses = sad.third.responses.length;
			else responses = 0;
			embed.addField(sad.third.name, `Description: ${sad.third.description}\nResponses: ${responses}`);
		}
		if (noAddons == true) embed.setDescription("This server has no server addons! Use `c!addserveraddon` to add one!");
		send.sendChannel({ channel: message.channel, author: message.author }, { embeds: [embed] });
	}
};