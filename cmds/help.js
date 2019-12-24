module.exports.run = (bot, msg) => {
    const channel = msg.channel;
    channel.send('\`\`\`絢櫻指令集\n---\n遊戲相關\n\%start 開始遊戲\n\%stop 停止遊戲\n%data 查看自己的解題數據\n遊戲規則：總共有20次機會 回答間隔為一分鐘 超時自動結束\n---\n抽蝦蝦\`\`\`');

}

module.exports.help = {
    name: 'help'
}