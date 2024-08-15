const shop = document.querySelector(".shop-modal");
let stuff = document.querySelector(".shop-modal .content .stuff");
const shopButton = document.querySelector(".shop-button")
let types = [];
let ckcRainbow = false;
let t = false;
if ($.jStorage.get("t")) t = true;

const findAll = (array, whatToFind) => {
    let newArray = [];
    array.forEach((e) => {
        if (whatToFind(e)) newArray.push(e);
    });
    return newArray;
};

class ShopItem {
    constructor(name = "", price, description = "", image = "", type = "", id = "", onBuy, coolDown, saveCD, si) {
        /*
         * Create a new item in the shop using this class lol
         * @param {string} name - The name of the item
         * @param {number} price - The price of the item
         * @param {string} description - The description of the item
         * @param {string} image - The image of the item
         * @param {string} type - The type/category of the item
         * @param {string} id - The jStorage id of the item
         * @param {function} onBuy - The function to run when the item is bought
         * @param {number} coolDown - The cool down of the item (in seconds)
         * @param {boolean} saveCD - Whether to save the cool down of the item or not
         */
        price = parseInt(price);
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.type = type;
        this.id = id;
        this.onBuy = onBuy;
        this.coolDown = coolDown || 0;
        this.saveCD = saveCD || false;
        this.si = si || 0;

        if(si === 1) stuff = document.querySelector(".knowledge-modal .content .stuff")
        if (!types.find((t) => t === this.type)) {
            let category = document.createElement("h1");
            category.innerHTML = this.type;
            category.style.width = "100%";
            category.classList.add(this.type);
            stuff.append(category);
            types.push(this.type);
        }
        let item = document.createElement("div");
        item.innerHTML = `<img src="${this.image}" alt="${this.name}" /><h2>${this.name}</h2><p>${this.description}</p><button>${this.price}✧</button>`;
        item.querySelector("img").style.width = "calc(100% - 20px)";
        item.querySelector("button").style.padding = "5px 10px";
        item.querySelector("button").addEventListener("click", () => {
            if(this.si !== 0) return
            if ($.jStorage.get("sparkles") < this.price)
                return showNotif("你買不起!", 1);
            takeSparkles(this.price);
            if(this.coolDown > 0) {
                $.jStorage.set(this.id + "-cd", Date.now() + this.coolDown * 1000);
                setInterval(() => {
                    let b = this.item.querySelector("button")
                    if($.jStorage.get(this.id + "-cd") < Date.now()) {
                        b.disabled = false
                        b.innerText = this.price + "✧";
                    } else {
                        b.disabled = true
                        b.innerText = `還有${Math.floor(($.jStorage.get(this.id + "-cd") - Date.now()) / 1000)}秒`
                    }
                })
            }
            this.onBuy();
        });
        if(this.saveCD && $.jStorage.get(this.id + "-cd")) {
            setInterval(() => {
                let b = this.item.querySelector("button")
                if($.jStorage.get(this.id + "-cd") < Date.now()) {
                    b.disabled = false
                    b.innerText = this.price + "✧";
                } else {
                    b.disabled = true
                    b.innerText = `還有${Math.floor(($.jStorage.get(this.id + "-cd") - Date.now()) / 1000)}秒`
                }
            })
        }
        this.item = item;
        stuff.append(item);
    }
    buy() {
        this.onBuy();
    }
    disable(isDisabled, customText) {
        this.item.querySelector("button").disabled = isDisabled;
        if (isDisabled) {
            this.item.querySelector("button").innerText =
                customText || "已購買";
        } else {
            this.item.querySelector("button").innerText = this.price + "✧";
        }
    }
    changeButton(callback) {
        callback(this.item.querySelector("button"));
    }
    save(e) {
        $.jStorage.set(this.id, e);
    }
    hidden(isHidden) {
        this.item.style.display = isHidden ? "none" : "block";
        let isAlone =
            findAll(types, (t) => {
                return t === this.type;
            }).length <= 1;
        if (isAlone) {
            document.querySelector(
                "." + types.find((t) => t === this.type),
            ).style.display = "none";
        }
    }
    skipCoolDown() {
        $.jStorage.set(this.id + "-cd", 0)
    }
}
let num = 245
let stupidlyRandomNumber = rng(num)
let speedRunMode = false;
let speedRunEnd = false;
let speedRunCooldown = 60 * 60 * 1000;
let speedRunWins = 0;
let speedRunWords = [];


let funnyItem = new ShopItem(
    "???",
    -1,
    "???",
    "../images/???.png",
    "？？？",
    "???",
    () => {
        music.src = '../sfx/glitch.mp3'
        showNotif("???", 1);
        giveAch("gb")
        $.jStorage.set("funny", true)
        setTimeout(picksceell, 10000)
        setTimeout(() => {
            clearInterval(wH)
            wH = setInterval(() => {
                sfx('boom')
            }, 1000)
        }, 10000)
        setTimeout(() => {
            window.location.reload()
        }, 18976)
    }
)
shopButton.addEventListener('click', () => {
    stupidlyRandomNumber = rng(num)
    if(stupidlyRandomNumber !== 34) {
        funnyItem.hidden(true)
    } else funnyItem.hidden(false)
    console.log(stupidlyRandomNumber)
})
if(stupidlyRandomNumber !== 34) {
    funnyItem.hidden(true)
} else funnyItem.hidden(false)
let speed = new ShopItem(
    "速通模式",
    500,
    "看你在120秒內贏多少次！<br/>會給兩倍的✧，但連勝不給✧。<br/>第一次購買要✧但第二次不用。<br/>啟動後會有一小時冷卻時間。<br/>會重置連勝。",
    "../images/speed.png",
    "遊玩",
    "speed",
    () => {
        if (hardMode) return showNotif("不可以重疊模式！");
        checkStreak(0)
        document.querySelector('.shop-modal').classList.remove('show')
        speed.price = 0;
        let cd = Date.now();
        speed.save({
            bought: true,
            time: cd,
        });
        speedRunMode = true;
        document.querySelector("audio").src = "../sfx/WaxTerK GANGIMARI.mp3";
        speed.disable(true);
        let bt = Date.now();
        let timeout = bt + 120 * 1000;
        let display = document.createElement("div");
        let displayText = document.createElement("h2");
        display.append(displayText);
        display.classList.add("speedrun");
        document.body.append(display);
        game.style.animation = "pulse calc(60s/95/2) infinite";
        let interval = setInterval(() => {
            displayText.innerText =
                Math.floor((timeout - Date.now()) / 10) / 100 + "秒";
            if (timeout <= Date.now()) {
                document.querySelector("audio").src = "../sfx/Wallpaper.mp3";
                speedRunEnd = true;
                gameOver("srw");
                speedRunMode = false;
                speedRunWins = 0;
                game.style.animation = "unset";
                speed.disable(false);
                let gggg = setInterval(() => {
                    let timeeee = Math.floor(
                        (cd + speedRunCooldown - Date.now()) / 1000,
                    );
                    speed.disable(true, "還有" + timeeee + "秒");
                    if (timeeee <= 0) {
                        speed.disable(false);
                        speed.changeButton((b) => {
                            b.innerText = "啟動";
                        });
                        clearInterval(gggg);
                    }
                });
                document.body.removeChild(display);
                clearInterval(interval);
            }
        });
    },
);
if ($.jStorage.get("speed")) {
    speed.price = 0;
    let cd = $.jStorage.get("speed").time;
    let gggg = setInterval(() => {
        let timeeee = Math.floor((cd + speedRunCooldown - Date.now()) / 1000);
        speed.disable(true, "還有" + timeeee + "秒");
        if (timeeee <= 0) {
            speed.disable(false);
            speed.changeButton((b) => {
                b.innerText = "啟動";
            });
            clearInterval(gggg);
        }
    });
}
let hard = new ShopItem(
    "困難模式！",
    1000,
    "提示是亂碼！<br/>會給10倍✧<br/>會重置連勝。",
    "../images/hard.png",
    "遊玩",
    "hard",
    () => {
        if (speedRunMode) return showNotif("不可以重疊模式！");
        checkStreak(0)
        hardMode = !hardMode;
        getRandomWord();
        if (hardMode) {
            hard.price = 0;
            hard.changeButton((b) => {
                b.innerText = "關閉";
            });
        } else {
            hard.changeButton((b) => {
                b.innerText = "開啟";
            });
        }
        hard.save(true);
    },
);
if ($.jStorage.get("hard")) {
    hard.price = 0;
    hard.changeButton((b) => {
        b.innerText = "開啟";
    });
}
let changeWord = new ShopItem(
    "更換單字",
    200,
    "更換單字，不會重置連勝。<br/>100秒冷卻。",
    "../images/change-word.png",
    "遊玩",
    "changeWord",
    () => {
        getRandomWord()
    }, 100, true
)
let customKeyColor = new ShopItem(
    "自訂鍵盤邊框顏色",
    100,
    "用 rgb 或 16進位顏色號碼或英文都可，像是rgb(0, 128, 0) 或 #00ff00 或 white",
    "../images/custom-key-color.jpeg",
    "外觀",
    "customKeyColor",
    () => {
        let color = prompt("請輸入顏色");
        if (!color) color = "#00ff00";
        if (color.toLowerCase() === "rainbow" || color === "彩虹") {
            ckcRainbow = true;
        } else ckcRainbow = false;
        document
            .querySelectorAll(".keyboard button")
            .forEach((a) => (a.style.border = "3px solid " + color));
        customKeyColor.price = 0;
        customKeyColor.changeButton((b) => {
            b.innerText = "變換顏色";
        });
        if ($.jStorage.get("customBGIMG")) {
            giveAch("new");
        }
        customKeyColor.save(color);
    },
);
if ($.jStorage.get("customKeyColor")) {
    customKeyColor.price = 0;
    let color = $.jStorage.get("customKeyColor");
    if (color.toLowerCase() === "rainbow" || color === "彩虹") {
        ckcRainbow = true;
    } else ckcRainbow = false;
    document
        .querySelectorAll(".keyboard button")
        .forEach((a) => (a.style.border = "3px solid " + color));
    customKeyColor.changeButton((b) => {
        b.innerText = "變換顏色";
    });
}
let dbgi = $.jStorage.get("dbgi") || 0;
let customBGIMG = new ShopItem(
    "自訂背景圖片",
    200,
    "上傳圖片來改深綠色背景!",
    "../images/custom-bg-img.jpeg",
    "外觀",
    "customBGIMG",
    () => {
        customBGIMG.price = 0;
        customBGIMG.changeButton((b) => {
            b.innerText = "變換圖片";
            if (!customBGIMG.item.querySelector("input")) {
                let input = document.createElement("input");
                input.type = "file";
                input.accept = "image/png, image/jpg, image/jpeg, image/gif";
                input.style.display = "none";
                customBGIMG.item.append(input);
            }
        });
        let input = customBGIMG.item.querySelector("input");
        input.onchange = () => {
            img = URL.createObjectURL(input.files[0]);
            document.body.style.backgroundImage = "url(" + img + ")";
            document.body.style.backgroundSize = "cover";
            localStorage.setItem("customBGIMG", img);
        };
        if (customBGIMG.item.querySelectorAll("button").length <= 3) {
            let o = document.createElement("button");
            o.innerText = "半透明遊戲視窗";
            o.style.marginTop = "10px";
            o.style.padding = "5px 10px";
            customBGIMG.item.append(o);
            let rb = document.createElement("button");
            rb.innerText = "清除圖片";
            rb.style.marginTop = "10px";
            rb.style.padding = "5px 10px";
            customBGIMG.item.append(rb);
            let dbg = document.createElement("button");
            dbg.innerText = "動態背景" + (dbgi + 1) + "號";
            dbg.style.marginTop = "10px";
            dbg.style.padding = "5px 10px";
            dbg.classList.add("beta");
            customBGIMG.item.append(dbg);
            o.addEventListener("click", () => {
                t = !t;
                if (t && winStreak < 5) game.style.background = "#ffffff3c";
                else if (t && winStreak >= 5 && winStreak < 10)
                    game.style.background = "#fff0003c";
                else if (t && winStreak >= 10) game.style.background = "#cc77ff3c";
                else if (!t && winStreak < 5) game.style.background = "#ffffff";
                else if (!t && winStreak >= 5 && winStreak < 10)
                    game.style.background = "#fff000";
                else if (!t && winStreak >= 10) game.style.background = "#cc77ff";
                game.classList.toggle("transparent");
            });
            rb.addEventListener("click", () => {
                localStorage.removeItem("customBGIMG");
                document.body.style.backgroundImage = "none";
            });
            dbg.addEventListener("click", () => {
                dbgi++;
                if (dbgi > dynamicBGList.length - 1) {
                    dynamicBGList[dbgi - 1].remove();
                    dbgi = 0;
                }
                dbg.innerText = "動態背景" + (dbgi + 1) + "號";
                if (dynamicBGList[dbgi - 1]) dynamicBGList[dbgi - 1].remove();
                dynamicBGList[dbgi].play();
                $.jStorage.set("dbgi", dbgi);
            });
        }
        input.click();
        if ($.jStorage.get("customKeyColor")) {
            giveAch("new");
        }
        customBGIMG.save(true);
    },
);
if ($.jStorage.get("customBGIMG")) {
    customBGIMG.price = 0;
    customBGIMG.changeButton((b) => {
        b.innerText = "變換圖片";
        if (!customBGIMG.item.querySelector("input")) {
            let input = document.createElement("input");
            input.type = "file";
            input.accept = "image/png, image/jpg, image/jpeg, image/gif";
            input.style.display = "none";
            customBGIMG.item.append(input);
        }
    });
    if (customBGIMG.item.querySelectorAll("button").length <= 3) {
        let o = document.createElement("button");
        o.innerText = "半透明遊戲視窗";
        o.style.marginTop = "10px";
        o.style.padding = "5px 10px";
        customBGIMG.item.append(o);
        let rb = document.createElement("button");
        rb.innerText = "清除圖片";
        rb.style.marginTop = "10px";
        rb.style.padding = "5px 10px";
        customBGIMG.item.append(rb);
        let dbg = document.createElement("button");
        dbg.innerText = "動態背景" + (dbgi + 1) + "號";
        dbg.style.marginTop = "10px";
        dbg.style.padding = "5px 10px";
        dbg.classList.add("beta");
        customBGIMG.item.append(dbg);
        o.addEventListener("click", () => {
            t = !t;
            game.classList.toggle("transparent");
        });
        rb.addEventListener("click", () => {
            localStorage.removeItem("customBGIMG");
            document.body.style.backgroundImage = "none";
        });
        dbg.addEventListener("click", () => {
            dbgi++;
            if (dbgi > dynamicBGList.length - 1) {
                dynamicBGList[dbgi - 1].remove();
                dbgi = 0;
            }
            dbg.innerText = "動態背景" + (dbgi + 1) + "號";
            if (dynamicBGList[dbgi - 1]) dynamicBGList[dbgi - 1].remove();
            dynamicBGList[dbgi].play();
            $.jStorage.set("dbgi", dbgi);
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        if ($.jStorage.get("dbgi")) dynamicBGList[dbgi].play();
    });
    let img = localStorage.getItem("customBGIMG");
    document.body.style.backgroundImage = "url(" + img + ")";
    document.body.style.backgroundSize = "cover";
}
let catLevel = $.jStorage.get("catLevel") || 1;
let a = new ShopItem(
    "西瓜貓",
    10,
    "可愛的西瓜貓陪你一下",
    "../images/2.png",
    "其他",
    "cat",
    () => {
        if ($.jStorage.get("cat")) {
            catLevel++;
            $.jStorage.set("catLevel", catLevel);
            a.price = 2 ** catLevel;
            if (a.price < 10) a.price = 16;
            a.changeButton((b) => {
                b.innerText = a.price + "✧ 升級 等級" + catLevel;
            });
            if (catLevel >= 10) {
                catLevel = 10;
                $.jStorage.set("catLevel", catLevel);
                a.disable(true);
                a.changeButton((b) => {
                    b.innerText = "已達到最高等!";
                });
            }
            let rate = (60 * 5) / catLevel;
            rate = rate.toString().slice(0, 5);
            a.item.querySelector("p").innerText =
                "每" + rate + "秒 1 ~ " + 10 * catLevel + "✧";

            return;
        }
        let cat = document.createElement("img");
        cat.src = "../images/2.png";
        cat.style.height = "250%";
        pd(characters[2], '喵')
        pd(characters[2], '喵要挖閃喵')
        pd(characters[2], '喵')
        dialogue(dialogueQueue)
        document.querySelector(".navbar").appendChild(cat);
        setInterval(
            () => {
                let adsf = rng(10 * catLevel, 1);
                giveSparkles(adsf);
                showNotif("西瓜貓找到了" + adsf + "✧!!", 1);
                data.catSparkles += adsf;
            },
            (1000 * 60 * 5) / catLevel,
        );
        a.save(true);
        a.price = 10 * catLevel;
        a.changeButton((b) => {
            b.innerText = a.price + "✧ 升級 等級" + catLevel;
        });
        a.item.querySelector("p").innerText =
            "每" + (60 * 5) / catLevel + "秒 1 ~ " + 10 * catLevel + "✧";
        giveAch("cat");
    },
);
if ($.jStorage.get("cat")) {
    if ($.jStorage.get("catLevel") > 1) {
        a.price = 2 ** catLevel;
        a.changeButton((b) => {
            b.innerText = a.price + "✧ 升級 等級" + catLevel;
        });
        if (catLevel >= 10) {
            catLevel = 10;
            $.jStorage.set("catLevel", catLevel);
            a.disable(true);
            a.changeButton((b) => {
                b.innerText = "已達到最高等!";
            });
        }
    }
    let cat = document.createElement("img");
    cat.src = "../images/2.png";
    cat.style.height = "250%";
    document.querySelector(".navbar").appendChild(cat);
    setInterval(
        () => {
            let adsf = rng(10 * catLevel, 1);
            giveSparkles(adsf);
            showNotif("西瓜貓找到了" + adsf + "✧!!", 1);
            data.catSparkles += adsf;
        },
        (1000 * 60 * 5) / catLevel,
    );
    a.save(true);
    if (catLevel < 10) {
        a.changeButton((b) => {
            b.innerText = a.price + "✧ 升級 等級" + catLevel;
        });
    }
    let rate = (60 * 5) / catLevel;
    rate = rate.toString().slice(0, 5);
    a.item.querySelector("p").innerText =
        "每" + rate + "秒 1 ~ " + 10 * catLevel + "✧";
    giveAch("cat");
}
let scam = new ShopItem(
    "無限✧!!",
    999,
    "無限✧!!1",
    "../images/scam.jpeg",
    "其他",
    "scam",
    () => {
        giveAch("scammed");
        alert(`哈哈笑死被騙了`);
        scam.disable(true);
        scam.save(true);
    },
);
if ($.jStorage.get("scam")) {
    scam.disable(true);
}
