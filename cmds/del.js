const json = require('jsonfile');

module.exports.run = async (bot, msg) => {
    const content = msg.content.split(" ");
    if (content[0] === '!del') {
        if (content.length !== 3) {
            msg.reply('請輸入正確指令');
            return;
        }
        let role = msg.guild.roles.find("name", "mods");

        if (!msg.member.roles.has(role.id)) {
            msg.reply(msg.member.position);
            msg.reply('您並沒有權限');
            return;
        }
        if (content[1] === 't') {
            json.readFile('cmds/t.json', (err, result) => {
                if (err) throw err;

                if (result[content[2]]) {
                    result[content[2]] = null;
                    delete result[content[2]];
                    json.writeFile('data/t.json', result);
                    msg.reply('刪除成功');
                } else {
                    msg.reply('不存在');
                }
            })
        }
    }
}