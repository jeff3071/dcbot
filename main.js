const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let flag = false;
let author,answer,count = 10;
const gamechannel = '451387091214139393', gfchannel = '399414118030901248';

function compare(num, ans){
	let a = [(ans-ans%1000)/1000, (ans%1000-ans%100)/100, (ans%100-ans%10)/10, (ans%10)];
	let b = [(num-num%1000)/1000, (num%1000-num%100)/100, (num%100-num%10)/10, (num%10)];
	// console.log(a,b);
	let A = 0,B = 0;
	for (var i = 0; i < 4; i++) {
		if (a[i]===b[i]) {
				A = A + 1;
		}
		for (var j = 0; j < 4;j++){
			if (a[j]===b[i] && i !== j){
				B = B + 1;
			}
		}
	}
	return [A,B];
}

function checkres(res){
	const content = res.content;
	const num = parseInt(content);
	const rauthor = res.author.id;

	if(content.length !== 4 || !flag || isNaN(num)){
		return false;
	}else{
		let b = [(num-num%1000)/1000, (num%1000-num%100)/100, (num%100-num%10)/10, (num%10)];

		for(var i = 0; i < 4; i++){
			for(var j = i+1; j < 4; j++){
				if(b[i]===b[j]){
					return false;
				}
			}
		}
		return true;
	}
}

function generateans(){
	var arr = []
		for(var i = 0;i < 10;i++){
			arr[i] = i;
		}
		for (var i = arr.length - 1; i > 0; i--) {
        	j = Math.floor(Math.random() * (i + 1));
        	temp = arr[i];
        	arr[i] = arr[j];
        	arr[j] = temp;
    	}
    	if(arr[0] !== 0){
	    	ans = arr[0]*1000+arr[1]*100+arr[2]*10+arr[3];
    	}else{
	    	ans = arr[1]*1000+arr[2]*100+arr[3]*10+arr[4];
    	}
    return ans;
}

function endgame(){
	count = 10;
	flag = false;
	solvetimesec = 0;
	stopchecktime();
	stopcounttime();
}

let time, solvetime, solvetimesec, limitTime = 60000;

function counttime(){
	solvetime = setInterval(function(){
		solvetimesec += 1;
	},1000);
}

function stopcounttime(){
	clearInterval(solvetime);
}

function startchecktime(msg){
	time = setTimeout(function(){
		flag = false;
		endgame();
		msg.reply('逾時回應');
	},limitTime);
}

function stopchecktime(){
	clearTimeout(time);
}

client.on('message', msg => {
	// console.log(msg.channel.id)
	if(msg.author.bot) return;
	if(msg.channel.id !== gamechannel) return;

	const content = msg.content;
	const num = parseInt(content);

	if(content === '%start' && !flag) {
		msg.reply('1A2B遊戲開始\n 請輸入一個四位數字 您共有10次機會');
		
		answer = generateans();

		solvetimesec = 0;
		counttime();
		
		console.log(answer);

		author = msg.author.id;
		flag = true;

		startchecktime(msg);

	}else if(checkres(msg) && count >= 1) {
		if(num === answer){
			msg.reply(`恭喜答對 您本次的解題時間為${solvetimesec}秒`);
			endgame();
		}else{
			let r = compare(num, answer);
			count--;
			if(count === 0){
				msg.reply(`超過10次 停止遊戲 答案是${answer}`);
				endgame();
			}else{
				msg.reply(`你獲得${r[0]}A${r[1]}B 還剩${count}次機會`);
				stopchecktime();
				startchecktime(msg);
			}
		}
	}else if(content === '%stop' && flag) {
		msg.reply(`停止遊戲 答案是${answer}`);
		endgame();
	}else if(!checkres(msg) && flag) {
		msg.reply('請輸入四 位 數 字!');
		stopchecktime();
		startchecktime(msg);
	}
});

let searchflag = true;
const limitsearchtime = 3000;

client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.channel.id !== gfchannel) return;
	if (!searchflag) {
		msg.reply('冷卻中').then(message => { message.delete(limitsearchtime)});
		return;
	}

	const content = msg.content.split(" ", 2);

	if (content[0] === '!e') {
		switch (content[1]) {
			case '300':
				msg.reply('盾甲妖精');
				break;
			case '305':
				msg.reply('護盾妖精');
				break;
			case '310':
				msg.reply('嘲諷妖精');
				break;
			case '330':
				msg.reply('狙擊妖精');
				break;
			case '335':
				msg.reply('砲擊妖精');
				break;
			case '340':
				msg.reply('空襲妖精');
				break;
			case '400':
				msg.reply('增援妖精');
				break;
			case '405':
				msg.reply('空降妖精');
				break;
			case '410':
				msg.reply('防禦妖精');
				break;
			case '430':
				msg.reply('勇士妖精');
				break;
			case '435':
				msg.reply('暴怒妖精');
				break;
			case '500':
				msg.reply('指揮妖精');
				break;
			case '505':
				msg.reply('搜救妖精');
				break;
			case '510':
				msg.reply('照明妖精');
				break;
			case '530':
				msg.reply('布雷妖精');
				break;
			case '535':
				msg.reply('火箭妖精');
				break;
			case '540':
				msg.reply('工事妖精');
				break;
			//以上為妖精
			case '5':
				msg.reply('白光瞄');
				break;
			case '7':
				msg.reply('白消音');
				break;
			case '8':
				msg.reply('白全息');
				break;
			case '9':
				msg.reply('白夜戰');
				break;
			case '10':
				msg.reply('白紅點');
				break;
			case '12':
				msg.reply('白外骨');
				break;
			case '13':
				msg.reply('白空尖');
				break;
			case '14':
				msg.reply('白獵鹿/獨頭');
				break;
			case '15':
				msg.reply('白穿甲');
				break;
			case '16':
				msg.reply('白披風');
				break;
			case '18':
				msg.reply('白披風');
				break;
			case '20':
				msg.reply('藍光瞄');
				break;
			case '22':
				msg.reply('藍消音');
				break;
			case '23':
				msg.reply('藍全息');
				break;
			case '24':
				msg.reply('藍夜戰');
				break;
			case '25':
				msg.reply('藍紅點');
				break;
			case '26':
				msg.reply('藍防彈插版');
				break;
			case '27':
				msg.reply('藍外骨');
				break;
			case '28':
				msg.reply('藍空尖');
				break;
			case '29':
				msg.reply('藍獵鹿/獨頭');
				break;
			case '30':
				msg.reply('藍穿甲');
				break;
			case '31':
				msg.reply('藍披風');
				break;
			case '33':
				msg.reply('藍高速');
				break;
			case '35':
				msg.reply('綠光瞄');
				break;
			case '37':
				msg.reply('綠消音');
				break;
			case '38':
				msg.reply('綠全息');
				break;
			case '39':
				msg.reply('綠夜戰');
				break;
			case '40':
				msg.reply('綠紅點');
				break;
			case '41':
				msg.reply('綠防彈插版');
				break;
			case '42':
				msg.reply('綠外骨');
				break;
			case '43':
				msg.reply('綠空尖');
				break;
			case '44':
				msg.reply('綠獵鹿/獨頭');
				break;
			case '45':
				msg.reply('綠穿甲/金光瞄');
				break;
			case '46':
				msg.reply('綠披風');
				break;
			case '47':
				msg.reply('綠彈鏈箱/金消音');
				break;
			case '48':
				msg.reply('綠高速彈/金全息');
				break;
			case '49':
				msg.reply('金夜戰');
				break;
			case '50':
				msg.reply('金紅點');
				break;
			case '51':
				msg.reply('金防彈插版');
				break;
			case '52':
				msg.reply('金外骨');
				break;
			case '53':
				msg.reply('金空尖');
				break;
			case '54':
				msg.reply('金獵鹿/獨頭');
				break;
			case '55':
				msg.reply('金穿甲');
				break;
			case '56':
				msg.reply('金披風');
				break;
			case '57':
				msg.reply('金彈鏈箱');
				break;
			case '58':
				msg.reply('金高速彈');
				break;
			default:
				msg.reply('無此資料');
				break;
			}
		searchflag = false;
	} else if (content[0] === '!t') {
		switch (content[1]) {
			case '20':
				msg.reply('2☆HG.M1911 2☆HG.P38 2☆HG.納甘左輪');
				break;
			case '22':
				msg.reply('2☆HG.PPK');
				break;
			case '25':
				msg.reply('2☆HG.FNP-9');
				break;
			case '28':
				msg.reply('2☆HG.Bren Ten 2☆HG.USP');
				break;
			case '30':
				msg.reply('3☆HG.C96 3☆HG.P08');
				break;
			case '35':
				msg.reply('3☆HG.92式 3☆HG.P99');
				break;
			case '40':
				msg.reply('3☆HG.M9 3☆HG.阿斯特拉左輪 3☆HG.馬卡洛夫');
				break;
			case '45':
				msg.reply('3☆HG.托卡列夫');
				break;
			case '50':
				msg.reply('4☆HG.Mk23 4☆HG.柯爾特左輪');
				break;
			case '52':
				msg.reply('4☆HG.Spitfire噴火');
				break;
			case '53':
				msg.reply('4☆HG.K5');
				break;
			case '55':
				msg.reply('4☆HG.P7 4☆HG.斯捷奇金');
				break;
			case '100':
				msg.reply('5☆HG.維爾德MK2');
				break;
			case '102':
				msg.reply('5☆HG.競爭者');
				break;
			case '105':
				msg.reply('5☆HG.M950A綠毛 5☆HG.NZ75');
				break;
			case '110':
				msg.reply('2☆SMG.IDW 2☆SMG.PP-2000 5☆HG.灰熊');
				break;
			case '120':
				msg.reply('2☆SMG.M45 2☆SMG.SpectreM4');
				break;
			case '125':
				msg.reply('2☆SMG.64式');
				break;
			case '130':
				msg.reply('2☆SMG.M3 2☆SMG.MP40 2☆SMG.柏萊塔38型');
				break;
			case '140':
				msg.reply('3☆SMG.斯登 3☆SMG.微型烏茲');
				break;
			case '150':
				msg.reply('2☆SMG.PPSh-41鍋鍋莎 3☆SMG.F1(重造)');
				break;
			case '200':
				msg.reply('3☆SMG.MAC-10 3☆SMG.蠍式');
				break;
			case '205':
				msg.reply('3☆SMG.STAR_Z-62(重造)');
				break;
			case '210':
				msg.reply('3☆SMG.PPS-43粉毛波波莎');
				break;
			case '215':
				msg.reply('4☆SMG.UMP45 4☆SMG.UMP9');
				break;
			case '218':
				msg.reply('4☆SMG.希普卡 4☆SMG.PP-19-01');
				break;
			case '220':
				msg.reply('4☆SMG.MP5 4☆SMG.PP-90');
				break;
			case '225':
				msg.reply('5☆SMG.索米');
				break;
			case '228':
				msg.reply('5☆SMG.C-MS');
				break;
			case '230':
				msg.reply('5☆SMG.湯姆森 5☆SMG.G36C');
				break;
			case '235':
				msg.reply('5☆SMG.VECTOR 5☆SMG.79式');
				break;
			case '240':
				msg.reply('2☆AR.SIG-510 2☆AR.加利爾');
				break;
			case '245':
				msg.reply('2☆AR.F2000 2☆AR.63式');
				break;
			case '250':
				msg.reply('2☆AR.G3 2☆AR.L85A1');
				break;
			case '300':
				msg.rpely('3☆AR.StG44');
				break;
			case '310':
				msg.reply('2☆RF.FN-49 2☆RF.G43 3☆AR.OTs-12');
				break;
			case '315':
				msg.reply('3☆AR.ARX-160(重造)');
				break;
			case '320':
				mas.reply('2☆RF.BM59 3☆AR.FNC 3☆AR.AK-47');
				break;
			case '325':
				msg.reply('4☆AR.56-1 4☆AR.XM8');
				break;
			case '330':
				msg.reply('2☆RF.SVT-38 2☆RF.西蒙諾夫 4☆AR.AS_VAL 4☆AR.FAMAS 4☆AR.TAR-21');
				break;
			case '335':
				msg.reply('4☆AR.9A91');
				break;
			case '340':
				msg.reply('3☆RF.M14 3☆RF.SV-98 4☆AR.G36 4☆AR.莉貝蘿勒血包');
				break;
			case '345':
				msg.reply('5☆AR.FAL');
				break;
			case '348':
				msg.reply('5☆AR.T91');
				break;
			case '350':
				msg.reply('3☆RF.Ots-44 3☆RF.漢陽造88式 5☆AR.95式 5☆AR.97式');
				break;
			case '352':
				msg.reply('5☆AR.K2');
				break;
			case '353':
				msg.reply('5☆AR.MDR');
				break;
			case '355':
				msg.reply('5☆AR.HK416');
				break;
			case '358':
				msg.reply('5☆AR.RFB');
				break;
			case '400':
				msg.reply('3☆RF.M1加蘭德');
				break;
			case '404':
				msg.reply('5☆AR.G11');
				break;
			case '405':
				msg.reply('5☆AR.G41 5☆AR.Zas M21');
				break;
			case '409':
				msg.reply('5☆AR.AN94');
				break;
			case '410':
				msg.reply('4☆RF.莫辛-納甘 4☆RF.T5000');
				break;
			case '412':
				msg.reply('5☆AR.AK12');
				break;
			case '415':
				msg.reply('4☆RF.SVD');
				break;
			case '420':
				msg.reply('4☆RF.PSG-1 4☆RF.G28(重造)');
				break;
			case '425':
				msg.reply('4☆RF.春田');
				break;
			case '430':
				msg.reply('4☆RF.PTRD 4☆RF.PzB39(重造)');
				break;
			case '438':
				msg.reply('5☆RF.M1891卡姐');
				break;
			case '440':
				msg.reply('5☆RF.Kar95K');
				break;
			case '442':
				msg.reply('5☆RF.M91/38卡妹');
				break;
			case '445':
				msg.reply('5☆RF.NTR-20');
				break;
			case '450':
				msg.reply('2☆MG.FG42 2☆MG.AAT-52 5☆RF.WA2000');
				break;
			case '452':
				msg.reply('5☆RF.IWS2000');
				break;
			case '455':
				msg.reply('5☆RF.M99');
				break;
			case '500':
				msg.reply('2☆MG.DP28 2☆MG.MG34 5☆RF.老李-恩菲爾德');
				break;
			case '510':
				msg.reply('2☆MG.LWMMG');
				break;
			case '520':
				msg.reply('3☆MG.布倫');
				break;
			case '540':
				msg.reply('3☆MG.M1919A4');
				break;
			case '550':
				msg.reply('3☆MG.MG42');
				break;
			case '610':
				msg.reply('3☆MG.M2HB 4☆MG.M60');
				break;
			case '615':
				msg.reply('4☆MG.80式');
				break;
			case '620':
				msg.reply('4☆MG.MK48 4☆MG.AEK-999');
				break;
			case '625':
				msg.reply('4☆MG.M1918 4☆MG.阿梅利');
				break;
			case '630':
				msg.reply('4☆MG.MG3 4☆MG.PK');
				break;
			case '635':
				msg.reply('5☆MG.內蓋夫');
				break;
			case '640':
				msg.reply('5☆MG.MG4');
				break;
			case '645':
				msg.reply('5☆MG.MG5');
				break;
			case '650':
				msg.reply('5☆MG.PKP');
				break;
			case '714':
				msg.reply('4☆SG.M1014性暗示');
				break;
			case '715':
				msg.reply('3☆SG.NS2000');
				break;
			case '720':
				msg.reply('3☆SG.M500大打喵');
				break;
			case '725':
				msg.reply('3☆SG.KS-23');
				break;
			case '730':
				msg.reply('3☆SG.RMB-93 3☆SG.M1897');
				break;
			case '740':
				msg.reply('4☆SG.M590 4☆SG.SPAS-12');
				break;
			case '745':
				msg.reply('4☆SG.M37');
				break;
			case '750':
				msg.reply('4☆SG.超短');
				break;
			case '755':
				msg.reply('4☆SG.USAS-12馬猴燒酒');
				break;
			case '800':
				msg.reply('5☆SG.KSG');
				break;
			case '805':
				msg.reply('5☆SG.SAIGA-12');
				break;
			case '806':
				msg.reply('5☆SG.FP6');
				break;
			case '810':
				msg.reply('5☆SG.S.A.T.8小獅子');
				break;
			case '812':
				msg.reply('5☆SG.AA12');
				break;
			default:
				msg.reply('無此資料');
				break;
		}
		searchflag = false;
	}
	setTimeout(function () {
		searchflag = true;
	},limitsearchtime);
});

client.login('NDUxMzQ0NTI5MzgwMDgxNjY0.DfAbkw.NImd6TOviZ2l0QXeUnrZRu8M_VA');
