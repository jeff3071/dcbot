const json = require('jsonfile');

module.exports.run = (bot, msg) => {
    const content = msg.content.split(" ");
    if(content[0] === '!insert'){
        if (content.length !== 4) {
            msg.reply('請輸入正確指令');
            return;
        }
        let role = msg.guild.roles.find("name", "mods");

        if (!msg.member.roles.has(role.id)) {
            msg.reply(msg.member.position);
            msg.reply('您並沒有權限');
            return;
        }

        if(content[1] === 't'){
             json.readFile('data/t.json', (err, result) => {
                if(err) throw err;

                let s = [];
                for(let i = 0; i < content.length - 3; i++){
                    s[i] = content[i + 3];
                    console.log(content[i]);
                }

                if(!result[content[2]]){
                    result[content[2]] = s;
                    console.log(s);
                    json.writeFile('data/t.json', result);
                    msg.reply('成功寫入');
                }else{
                    msg.reply('已經存在');
                }
             })
        }
    }
}