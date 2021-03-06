const Discord = require('discord.js');
const fs = require('fs');

const img = require('./cmds/img');
const game = require('./cmds/game');
const search = require('./cmds/search');
const help = require('./cmds/help');
const data = require('./cmds/data');
const insert = require('./cmds/insert');
const del = require('./cmds/del');


const Client = new Discord.Client({disableEveryone: true});

fs.readdir('./cmds/',(err, file) => {
	if(err) console.error(err);

	let jsfiles = file.filter(f => f.split('.').pop() === 'js');
	if(jsfiles.length <= 0){
		console.log('no command load');
		return;
	}

	console.log(`loading ${jsfiles} command!`);
});

Client.on('ready', () => {
  console.log(`Logged in as ${Client.user.tag}!`);
});

const gamechannel = '451387091214139393', gfchannel = '399414118030901248';

Client.on('message', msg => {
	if(msg.author.Client) return;
	if(msg.channel.id !== gamechannel) return;

	game.run(Client, msg);
});

Client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.channel.id !== gfchannel) return;

	search.run(Client, msg);
	insert.run(Client, msg);
	del.run(Client, msg);
});

Client.on('message', msg => {
	if (msg.author.bot) return;

	const content = msg.content;

	if (content === '抽少前'){
		img.run(Client, msg, 'gf');
	}

	if (content === '抽蝦蝦'){
		img.run(Client, msg, 'sh')
	}

	if(content === '%help'){
		help.run(Client, msg);
	}
	
	if(content === '%data'){
		data.run(Client, msg);
	}

})

Client.login(process.env.BOT_TOKEN);