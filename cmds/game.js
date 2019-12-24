const fs = require('fs');
const json = require('jsonfile');

let gameflag = false;
let author, answer, count = 20;
let time, solvetime, solvetimesec, limitTime = 60000;

module.exports.run = (bot, msg) => {

    const content = msg.content;

    const num = parseInt(content);
    
    function counttime() {
        solvetime = setInterval(function () {
            solvetimesec += 1;
        }, 1000);
    }

    function stopcounttime() {
        clearInterval(solvetime);
    }

    function startchecktime(msg) {
        time = setTimeout(function () {
            gameflag = false;
            endgame();
            msg.reply('逾時回應');
        }, limitTime);
    }

    function stopchecktime() {
        clearTimeout(time);
    }

    function compare(num, ans) {
        let a = [(ans - ans % 1000) / 1000, (ans % 1000 - ans % 100) / 100, (ans % 100 - ans % 10) / 10, (ans % 10)];
        let b = [(num - num % 1000) / 1000, (num % 1000 - num % 100) / 100, (num % 100 - num % 10) / 10, (num % 10)];
        // console.log(a,b);
        let A = 0, B = 0;
        for (var i = 0; i < 4; i++) {
            if (a[i] === b[i]) {
                A = A + 1;
            }
            for (var j = 0; j < 4; j++) {
                if (a[j] === b[i] && i !== j) {
                    B = B + 1;
                }
            }
        }
        return [A, B];
    }

    function checkres(res) {
        const content = res.content;
        const num = parseInt(content);
        const rauthor = res.author.id;

        if (content.length !== 4 || !gameflag || isNaN(num)) {
            return false;
        } else {
            let b = [(num - num % 1000) / 1000, (num % 1000 - num % 100) / 100, (num % 100 - num % 10) / 10, (num % 10)];

            for (var i = 0; i < 4; i++) {
                for (var j = i + 1; j < 4; j++) {
                    if (b[i] === b[j]) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    function generateans() {
        var arr = []
        for (var i = 0; i < 10; i++) {
            arr[i] = i;
        }
        for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        if (arr[0] !== 0) {
            ans = arr[0] * 1000 + arr[1] * 100 + arr[2] * 10 + arr[3];
        } else {
            ans = arr[1] * 1000 + arr[2] * 100 + arr[3] * 10 + arr[4];
        }
        return ans;
    }

    function endgame() {
        count = 20;
        gameflag = false;
        solvetimesec = 0;
        stopchecktime();
        stopcounttime();
        console.log("end")
    }

    if (content === '%start' && !gameflag) {

        msg.reply(`1A2B遊戲開始\n 請輸入一個四位數字 您共有${count}次機會`);
        
        answer = generateans();

        solvetimesec = 0;
        counttime();

        console.log(answer);

        author = msg.author.id;

        authorname = msg.author.name;

        gameflag = true;

        startchecktime(msg);

        json.readFile('data.json', (err, result) => {
            if(err) throw err;
            authorid = author.toString();
            if(!result[authorid]){
                result[authorid] = {
                    "success": 0,
                    "fail": 0,
                    "timeavg": 0
                }
                json.writeFile('data.json', result);
                console.log('新玩家寫入');
            }
            // console.log(success, fail, timeavg);
        });


    } else if (checkres(msg) && count >= 1) {
        if (msg.author.id !== author) return;
        if (num === answer) {
            msg.reply(`恭喜答對 您本次的解題時間為${solvetimesec}秒`);
            const promise = new Promise((resolve, reject) =>{
                json.readFile('data.json', (err, result) => {
                if(err) throw err;

                authorid = author.toString();
                console.log(solvetimesec);
                result[authorid]["timeavg"] = Math.floor(((result[authorid]["timeavg"] * result[authorid]["success"]) + solvetimesec) / (result[authorid]["success"] + 1));
                result[authorid]["success"] = result[authorid]["success"] + 1;
                json.writeFile('data.json', result);
                console.log(result);
                resolve();
            })});
            promise.then(() => { endgame();}, (err) => {
                console.log(err);
            });
        } else {
            let r = compare(num, answer);
            count--;
            if (count === 0) {
                msg.reply(`超過20次 停止遊戲 答案是${answer}`);
                const promise = new Promise((resolve, reject) => {
                    json.readFile('data.json', (err, result) => {
                        if (err) throw err;

                        authorid = author.toString();
                        console.log(solvetimesec);
                        result[authorid]["fail"] = result[authorid]["fail"] + 1;
                        json.writeFile('data.json', result);
                        console.log(result);
                        resolve();
                    })
                });
                promise.then(() => { endgame(); }, (err) => {
                    console.log(err);
                });
            } else {
                msg.reply(`你獲得${r[0]}A${r[1]}B 還剩${count}次機會`);
                stopchecktime();
                startchecktime(msg);
            }
        }
    } else if (content === '%stop' && gameflag) {
        if (msg.author.id !== author) return;
        msg.reply(`停止遊戲 答案是${answer}`);
        const promise = new Promise((resolve, reject) => {
            json.readFile('data.json', (err, result) => {
                if (err) throw err;

                authorid = author.toString();
                console.log(solvetimesec);
                result[authorid]["fail"] = result[authorid]["fail"] + 1;
                json.writeFile('data.json', result);
                console.log(result);
                resolve();
            })
        });
        promise.then(() => { endgame(); }, (err) => {
            console.log(err);
        });
    } else if (!checkres(msg) && gameflag) {
        if (msg.author.id !== author) return;
        msg.reply('請輸入四 位 數 字!');
        stopchecktime();
        startchecktime(msg);
    }
}

module.exports.help = {
    name: 'game'
}