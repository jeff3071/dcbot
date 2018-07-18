const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const json = require('jsonfile');

const img = require('./cmds/img');
const game = require('./cmds/game');
const search = require('./cmds/search');

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

	const content = msg.content;
	game.run(Client, msg);
});

Client.on('message', async msg => {
	if (msg.author.bot) return;
	if (msg.channel.id !== gfchannel) return;

	search.run(Client, msg);
});

// let result = [];
// const img = new Promise((resolve, reject) => {
// 		for(let i = 1; i <= 10; i++){
// 			request({
// 				url: `https://wall.alphacoders.com/by_sub_category.php?id=241492&name=少女前线+壁纸&lang=Chinese&${page=i}`,
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

// img.then(() => {
// 	console.log(result);
// 	fs.writeFileSync('result.json', JSON.stringify(result));
// }, (err) => {
// 	console.log('err');
// });

Client.on('message', async msg => {
	if (msg.author.bot) return;

	const content = msg.content;

	if (content === '抽桌布'){ 
		img.run(Client, msg);
	}
})
Client.login('NDUxMzQ0NTI5MzgwMDgxNjY0.DfAbkw.NImd6TOviZ2l0QXeUnrZRu8M_VA');
