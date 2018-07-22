const fs = require('fs');

const json = require('jsonfile');

module.exports.run = async (bot, msg) => {
    const channel = msg.channel;

    json.readFile('result-phone.json', function (err, result) {
        if (err) throw err;
        let n = Math.floor(Math.random() * result.length);
        console.log(n);
        channel.send(
                result[n]
        )
    });
}

module.exports.help = {
    name: 'img-phone'
}