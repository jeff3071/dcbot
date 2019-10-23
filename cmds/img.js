const fs = require('fs');

const json = require('jsonfile');

module.exports.run = async (bot, msg, c) => {
    const channel = msg.channel;
    if(c === 'gf'){

        json.readFile('result.json', function (err, result) {
            if (err) throw err;
            let n = Math.floor(Math.random() * result.length);
            channel.send(result[n])
        });
    }

    if(c === 'sh'){
        fs.readFile('data/shrimp.csv', 'utf8',function(err, result){
            if (err) throw err;
            let dataArray = result.split(",");
            let n = Math.floor(Math.random() * dataArray.length)
            
            // console.log(dataArray[n].replace("\n", "").split("/"));
            p = dataArray[n].replace("\n", "").split("/")[7];
            

            channel.send("https://www.pixiv.net/artworks/" + p.split("_")[0]);
        });
    }
}

module.exports.help = {
    name: 'img'
}