const areaList = require(`${__dirname}/../../tools/constants`).exploreAreas;
const send = require(`${__dirname}/../../tools/send`);

module.exports = {
	name: "explore",
	description: "Explore the wilderness and find some cents!",
	argument: "None",
	perms: "",
	tips: "There's a chance to get cents, get no cents, or lose cents",
	cooldowny: "10 seconds",
	cooldown: 10000,
	execute: async function(message, args, prefix, client, [firebase, data]) {

		let userData = data.data();
		let random = Math.random() * 10;
		let amt = 0;
		let msg = ``;
		let area = areaList[Math.floor(Math.random() * areaList.length)];

		if (userData.inv.compass > 0) {
			if (random < 8) {
				amt = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
				if (userData.evil == true) amt = Math.ceil(amt * 0.5);
				let bal = userData.currencies.cents;
				bal = Number(bal) + Number(amt);

				msg = `You explored ${area.name}, and ${area.got.replace("{earned}", amt)}`;
				userData.currencies.cents = bal;

				await firebase.doc(`/users/${message.author.id}`).set(userData);
			}
			else {
				amt = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
				let bal = userData.currencies.cents;
				bal = Number(bal) - Number(amt);
				if (bal < 0) bal = 0;

				msg = `You explored ${area.name}, but ${area.lost.replace("{lost}", amt)}`;
				userData.currencies.cents = bal;

				await firebase.doc(`/users/${message.author.id}`).set(userData);
			}
		}

		else {
			if(random < 6) {
				amt = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
				if (userData.evil == true) amt = Math.ceil(amt * 0.5);

				let bal = userData.currencies.cents;
				bal = Number(bal) + Number(amt);

				msg = `You explored the ${area.name}, and ${area.got.replace("{earned}", amt)}`;
				userData.currencies.cents = bal;
				await firebase.doc(`/users/${message.author.id}`).set(userData);
			}
			if (random < 8) {
				amt = 0;
				msg = `You explored ${area.name} but got no cents...`;
			}
			else {
				amt = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
				let bal = userData.currencies.cents;
				bal = Number(bal) - Number(amt);
				if (bal < 0) bal = 0;

				msg = `You explored ${area.name}, but ${area.lost.replace("{lost}", amt)}`;
				userData.currencies.cents = bal;

				await firebase.doc(`/users/${message.author.id}`).set(userData);
			}
		}
		send.sendChannel({ channel: message.channel, author: message.author }, { content: msg });
	}
};