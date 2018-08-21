const json = require('jsonfile');

var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect("mongodb+srv://admin:eddie84567@test-mjoxl.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, db) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         db.db("tset").collection("test", (err, collection) => {
//             console.log(collection);
//         });

//         console.log('connected');
//         db.close();
//     }
// });



module.exports.run = async (bot, msg) => {
    const authorid = msg.author.id;
    json.readFile('data.json', (err, result) => {
        if (err) throw err;
        if (result[authorid]) {
            msg.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    fields: [{
                        name: "解題成功數",
                        value: result[authorid]["success"]
                    },
                    {
                        name: "解題失敗數",
                        value: result[authorid]["fail"]
                    },
                    {
                        name: "平均解題時間",
                        value: result[authorid]["timeavg"]
                    }]
                }});
        }else{
            msg.channel.send('無使用者資料');
        }
    })
}

module.exports.help = {
    name: 'data'
}