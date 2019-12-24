const json = require('jsonfile');

let searchflag = true;
const limitsearchtime = 1000;

module.exports.run = (bot, msg) => {
    const content = msg.content.split(" ", 2);
    if (!searchflag && (content[0] === '!t' || content[0] === '!e') ){
        msg.reply('冷卻中').then(message => { message.delete(limitsearchtime) });
        setTimeout(function () {
            msg.delete(limitsearchtime);
        }, limitsearchtime);
        return;
    }

    if(content[0] === '!t'){
        json.readFile('data/t.json', (err, result) => {
            if(err) throw err;

            if(result[content[1]]){
                let s = '';
                for(let i = 0; i < result[content[1]].length ;i++){
                    s = s + result[content[1]][i];
                }
                msg.reply(s);
            }else{
                msg.reply('無此資料').then(message => {
                    message.delete(limitsearchtime)
                    msg.delete(limitsearchtime);
                });
    
            }
        })

        searchflag = false;
    }

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
                 msg.reply('無此資料').then(message => {
                     message.delete(limitsearchtime)
                 });
                 setTimeout(function () {
                     msg.delete(limitsearchtime);
                 }, limitsearchtime);
                 break;
         }
         searchflag = false;
     }
    setTimeout(function () {
        searchflag = true;
    }, limitsearchtime);


}

module.exports.help = {
    name: 'search'
}