const fs = require('fs');

const json = require('jsonfile');

module.exports.run = async (bot, msg) => {
    const channel = msg.channel;

    json.readFile('result.json', function (err, result) {
        if (err) throw err;
        let n = Math.floor(Math.random() * 300);
        channel.send({
            files:
                [result[n]]
        })
    });
}

module.exports.help = {
    name: 'img'
}