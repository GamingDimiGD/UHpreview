let fbd = false
let thingsThatFell = []
const finalBoss = () => {
    fbd = true
    let dall = $('body *')
    let blacklist = [
        game,
        $('.navbar')[0],
        $('.keyboard')[0],
        $('.game-box')[0],
        $('.dropdown')[0],
        $('.info')[0],
        $('.hangman-box')[0],
        $('.word-display')[0],
        $('.bhb')[0],
        $('.phb')[0],
        $('.bhb b')[0],
        $('.phb b')[0],
        $('.boss-dialogue')[0]
    ]
    document.querySelectorAll('.modal').forEach(ele => {
        blacklist.push(ele)
        ele.querySelectorAll('*').forEach(e => blacklist.push(e))
    })
    document.querySelectorAll('.dialogue *').forEach(ele => blacklist.push(ele))
    document.querySelectorAll('.boss-dialogue *').forEach(ele => blacklist.push(ele))
    document.querySelectorAll('.keyboard *').forEach(ele => blacklist.push(ele))
    document.querySelectorAll('i').forEach(ele => blacklist.push(ele))
    let ahh = setInterval(() => {
        let random = dall[rng(dall.length - 1)]
        if(dall.length + 5 === blacklist.length) {
            bounce($('.dropdown')[0], 10000)
            bounce($('.navbar')[0], 10000)
            finalBossMode = true
            clearInterval(ahh)
            bossReady()
            return
        }
        while (blacklist.includes(random)) {
            random = dall[rng(dall.length - 1)]
        }
        console.log(random)
        bounce(random, 10000)
        blacklist.push(random)
        thingsThatFell.push(random)
        console.log(blacklist.length, dall.length)
    }, 500)
}

const theFinale = () => {
    fbd = true
    bossSays("所以你還想要玩?", 7, true);
    setTimeout(() => {
        pd(0, "你可以不要這樣講話嗎", {
            textStyle: "bigtext",
        });
        pd(0, "我都快聽不到了");
        pd(4, "好啦");
        pd(1, "又是他，又是他!又是他!!!", {
            textStyle: "smalltext",
        });
        pd(1, "我恨死他了!!", {
            textStyle: ["smalltext", "red"],
        });
        pd(4, "你說啥");
        pd(1, "沒事");
        pd(0, "你到底來這幹嘛，又要打擾玩家嗎");
        pd(4, "看他詞彙量");
        pd(0, "然後哩");
        pd(4, "他玩太久了");
        pd(0, "你能做什麼，把地球炸掉嗎");
        pd(4, "對", {
            textStyle: ["bigtext", "red"],
        });
        pd(0, "...");
        pd(0, "我操你-");
        pd(1, "喂喂喂不要罵髒話");
        pd(1, "冷靜一點");
        pd(0, "好啦");
        pd(3, "哈囉");
        pd(1, "阿蛋妳怎麼來了");
        pd(3, "你看外面", {
            onclick: () => {
                document.querySelector(".navbar audio").src = "../sfx/uhhh.mp3";
            },
        });
        pd(0, "地球好像要炸掉了");
        pd(0, "阿蛋!!", {
            sound:　"BREAK",
            textStyle: "bigtext",
        });
        pd(0, "阿蛋!!", {
            sound:　"BREAK",
            textStyle: "bigtext",
        });
        pd(3, "啊啊啊啊", {
            textStyle: "bigtext",
        });
        pd(1, "阿蛋你還好吧");
        pd(3, "醫藥費", {
            textStyle: "bigtext",
        });
        pd(0, "他根本沒碰到你");
        pd(3, "好吧");
        pd(4, "你們這些人真的是欸");
        pd(3, "我不是人是蛋");
        pd(4, "我不管", {
            textStyle: "bigtext",
        });
        pd(4, "我受夠你們了", {
            textStyle: ["bigtext", "red"],
        });
        pd(4, "我要更改這宇宙的程式碼!!!", {
            textStyle: ["bigtext", "red"],
        });
        pd(4, "殺光所有人!!!", {
            textStyle: ["bigtext", "red"],
        });
        pd(0, "玩家快點打爆他!", {
            textStyle: "bigtext",
        });
        pd(0, '我給你裝了一個較強的武器!', {
            onclick: finalBoss
        })
        dq();
    }, 7000);
};