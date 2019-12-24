const fs = require('fs');

const json = require('jsonfile');

module.exports.run = (bot, msg, c) => {
    const channel = msg.channel;
    if(c === 'gf'){

        json.readFile('data/gf.json', function (err, result) {
            if (err) throw err;
            let n = Math.floor(Math.random() * result.length);
            channel.send("https://www.pixiv.net/artworks/" + result[n])
        });
    }

    if(c === 'sh'){
        fs.readFile('data/shrimp.csv', 'utf8',function(err, result){
            if (err) throw err;
            let dataArray = result.split(",");
            let n = Math.floor(Math.random() * dataArray.length)
            
            p = dataArray[n].replace("\n", "").split("/")[7];
            

            channel.send("https://www.pixiv.net/artworks/" + p.split("_")[0]);
        });
    }
}

module.exports.help = {
    name: 'img'
}