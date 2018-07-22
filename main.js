const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const json = require('jsonfile');

const img = require('./cmds/img');
const imgphone = require('./cmds/img-phone');
const game = require('./cmds/game');
const search = require('./cmds/search');
const help = require('./cmds/help');
const data = require('./cmds/data');

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

Client.on('message', async msg => {
	if(msg.author.Client) return;
	if(msg.channel.id !== gamechannel) return;

	game.run(Client, msg);
});

Client.on('message', async msg => {
	if (msg.author.bot) return;
	if (msg.channel.id !== gfchannel) return;

	search.run(Client, msg);
});

// let result = [];
// const imgu = new Promise((resolve, reject) => {
// 		for(let i = 1; i <= 6; i++){
// 			request({
// 				url: `https://mobile.alphacoders.com/by-sub-category/241492?page=${i}`,
// 				method: 'GET'
// 			}, function(e,r,b){
// 				if(e || !b) return;
// 				let $ = cheerio.load(b);
// 				let imgurl = $('.center a img');
// 				for(let i = 0;i < imgurl.length; i++){
// 					result.push($(imgurl[i]).attr('src'));
// 				}
// 			});
// 		}
// 		setTimeout(() => {
// 			resolve();
// 		},10000)
// 	})

// imgu.then(() => {
// 	console.log(result);
// 	fs.writeFileSync('result-phone.json', JSON.stringify(result));
// }, (err) => {
// 	console.log('err');
// });

Client.on('message', async msg => {
	if (msg.author.bot) return;

	const content = msg.content;

	if (content === '抽桌布'){
		img.run(Client, msg);
	}

	if (content === '抽手機桌布'){
		imgphone.run(Client, msg);
	}
})

Client.on('message', async msg => {
	if (msg.author.bot) return;

	const content = msg.content;

	if(content === '%help'){
		help.run(Client, msg);
	}
	if(content === '%data'){
		data.run(Client, msg);
	}

})
Client.login(process.env.token);
