let oiiooi = 1;
let player;
let lbossFightMode = false;
let finalBossMode = false;
let isGameOver = false;
let bossColor = "#fff";

let idkAnymore = false;

let canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let bossFightStarting = false;

let x = 0;
let y = 0;
let vxr = 0;
let vxl = 0;
let vyu = 0;
let vyd = 0;

let bullets = [];
let text = String.fromCharCode(rng(122, 97));
let by = y + 15;
setInterval(() => {
    by = y + 15;
});

let dd = 20;
let d = dd;
let hj = false;

let bossX = canvas.width / 2;
let bossY = 20;
let bossW = 200;
let bossH = 300;

const bossShootBullets = (type, width, height, amount, rate, speed) => {
    if (!type) type = "default";
    if (!width) width = 5;
    if (!height) height = 15;
    if (!amount) amount = 10;
    if (!rate) rate = 100;
    if (!speed) speed = 5;
    if (type === "default") {
        let i = setInterval(() => {
            amount--;
            bdb.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
            });
            if (amount <= 0) clearInterval(i);
        }, rate);
    } else if (type === "horizontal") {
        let i = setInterval(() => {
            amount--;
            bhba.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
                id: bhb.length,
            });
            if (amount <= 0) clearInterval(i);
        }, rate);
    } else if (type === "diagonal") {
        let i = setInterval(() => {
            amount--;
            bdib.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
                id: bdib.length,
            });
            if (amount <= 0) clearInterval(i);
        }, rate);
    } else if (type === "top") {
        let i = setInterval(() => {
            amount--;
            btb.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
            });
            if (amount <= 0) clearInterval(i);
        }, rate);
    } else if (type === "all") {
        let i = setInterval(() => {
            amount--;
            bdb.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
            });
            btb.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
            });
            bdib.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
                id: bdib.length,
            });
            bhba.push({
                x: bossX + bossW / 2,
                y: bossY + bossH / 2,
                width,
                height,
                speed: speed,
                id: bhb.length,
            });
            if (amount <= 0) clearInterval(i);
        }, rate);
    }
};

const bossLaser = (type, color, thickness) => {
    if (!type) type = "default";
    if (!color) color = "#fff";
    if (!thickness) thickness = window.height / 3;
    if (type === "default") {
        let y = rng(window.height) - thickness;
        if (y < 0) y = 0;
        dlaser.push({
            x: 0,
            y,
            thickness,
            color,
        });
    }
};

let dli = 0;
let invisibleframes = 180;
let ifi = 0;
let timelastframe = [];
const update = () => {
    if (ph < 0) ph = 0;
    if (bdb > 100) bdb.shift();
    if (bhba > 100) bhb.shift();
    if (bdib > 100) bdib.shift();
    if (btb > 100) bdb.shift();
    if (!minigamemode) {
        modalText = glitch(10);
        wordmeaning = glitch(10);
        let asdf = glitch(2) + "重來" + glitch(2);
        document.querySelector(".content h4").innerText = gameOverStatus;
        document.querySelector(".content p#ans").innerHTML =
            `<p id="ans">${modalText}<b>${currentWord}</b> </p>`;
        document.querySelector(".content p#meaning b").innerText = wordmeaning;
        document.querySelector(".play-again").innerText = asdf;

        if (ph <= 0 && !isGameOver) {
            gameOver(false);
            isGameOver = true;
            gameOverStatus = "加油! 我相信你!";
            document.querySelector(".play-again").innerText = asdf;
            pab.removeEventListener("click", getRandomWord);
            pab.addEventListener("click", () => {
                window.location.reload();
            });
        }
    }
    if (isGameOver) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (window.innerWidth < 726) {
        document.head.querySelectorAll("meta")[2].content =
            "width=device-width, initial-scale=0.75";
        document.querySelector(".hangman-box").style.display = "none";
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timelastframe.push(Date.now());
    let deltatime = 1;
    if (timelastframe.length > 1) {
        deltatime =
            (timelastframe[timelastframe.length - 1] -
                timelastframe[timelastframe.length - 2]) /
            15;
    }
    timelastframe = timelastframe.slice(-2);
    x += vxr * deltatime;
    x += vxl * deltatime;
    y += vyu * deltatime;
    y += vyd * deltatime;
    if (x > canvas.width - 70) x = canvas.width - 70;
    if (x < 0) x = 0;
    if (y > canvas.height - 70) y = canvas.height - 70;
    if (y < 0) y = 0;
    if (deg < 0) deg = (deg + 360) % 360;
    ctx.fillStyle = "#0f0";
    if (funMode) ctx.fillStyle = `rgb(${rng(rmv)}, ${rng(rmv)}, ${rng(rmv)}`;
    if (ifi > 0) {
        ifi--;
        if (ifi % 2 === 0) ctx.fillStyle = "#f00";
        else ctx.fillStyle = "#0f0";
    }
    if (
        lbossFightMode &&
        x + 70 > bossX &&
        x <= bossX + bossW &&
        y + 70 > bossY &&
        y <= bossY + bossH
    ) {
        console.log("colliding");
        if (ifi === 0) {
            ifi = invisibleframes;
            ph--;
            phbb.innerText = ph + "/" + phm;
            sfx("boom");
        }
    }
    ctx.fillRect(x, y, 70, 70);
    ctx.fillStyle = "#003c00";
    ctx.fillRect(x + 10, y + 10, 50, 50);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Noto Sans TC";
    ctx.fillText(text.toUpperCase(), x + 28, y + 42);
    if (im) {
        ctx.beginPath();
        ctx.moveTo(x + 35, y + 35);
        ctx.lineTo(x + 35, 0);
        ctx.stroke();
        ctx.closePath();
    }
    d -= deltatime;
    if (d <= 0) {
        ctx.fillRect(x + 35, by, 5, 15);
        d = dd;
        bullets.push({
            x: x,
            y: by,
        });
    }
    bullets.forEach((b) => {
        if (
            lbossFightMode &&
            bossX + bossW - 35 > b.x &&
            bossX - 35 <= b.x + 5 &&
            bossY + bossH > b.y &&
            bossY <= b.y + 15
        ) {
            bossColor = "#f00";
            bh--;
            bhbb.innerText = bh + "/" + bhm;
            bullets = bullets.filter(e => e !== b)
            sfx("fart");
        } else bossColor = "#fff";
        b.y -= 5 * deltatime;
        ctx.fillStyle = "#fff";
        ctx.fillRect(b.x + 35, b.y, 5, 15);
    });
    bdb.forEach((b) => {
        b.y += b.speed * deltatime;
        ctx.fillStyle = "#fff";
        ctx.fillRect(b.x, b.y, b.width, b.height);
        if (
            lbossFightMode &&
            x + 70 > b.x &&
            x <= b.x + b.width &&
            y + 70 > b.y &&
            y <= b.y + b.height
        ) {
            console.log("colliding");
            if (ifi === 0) {
                ifi = invisibleframes;
                ph--;
                phbb.innerText = ph + "/" + phm;
                sfx("boom");
            }
        }
    });
    bdib.forEach((b) => {
        if (b.id / 4 === Math.floor(b.id / 4)) {
            b.x += b.speed * deltatime;
            b.y += b.speed * deltatime;
        } else if (b.id / 2 === Math.floor(b.id / 2)) {
            b.x -= b.speed * deltatime;
            b.y += b.speed * deltatime;
        } else if (b.id / 4 - Math.floor(b.id / 4) === 0.25) {
            b.x += b.speed * deltatime;
            b.y -= b.speed * deltatime;
        } else {
            b.x -= b.speed * deltatime;
            b.y -= b.speed * deltatime;
        }
        if (funMode && rmv !== 0)
            ctx.fillStyle = `rgb(${rng(rmv)}, ${rng(rmv)}, ${rng(rmv)}`;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        if (
            lbossFightMode &&
            x + 70 > b.x &&
            x <= b.x + b.width &&
            y + 70 > b.y &&
            y <= b.y + b.height
        ) {
            console.log("colliding");
            if (ifi === 0) {
                ifi = invisibleframes;
                ph--;
                phbb.innerText = ph + "/" + phm;
                sfx("boom");
            }
        }
    });
    btb.forEach((b) => {
        b.y -= b.speed * deltatime;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        if (
            lbossFightMode &&
            x + 70 > b.x &&
            x <= b.x + b.width &&
            y + 70 > b.y &&
            y <= b.y + b.height
        ) {
            console.log("colliding");
            if (ifi === 0) {
                ifi = invisibleframes;
                ph--;
                phbb.innerText = ph + "/" + phm;
                sfx("boom");
            }
        }
    });
    let ghghgh = 0;
    bhba.forEach((b) => {
        if (ghghgh / 2 === Math.floor(ghghgh / 2)) b.x += b.speed * deltatime;
        else b.x -= b.speed * deltatime;
        ghghgh++;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        if (
            lbossFightMode &&
            x + 70 > b.x &&
            x <= b.x + b.width &&
            y + 70 > b.y &&
            y <= b.y + b.height
        ) {
            console.log("colliding");
            if (ifi === 0) {
                ifi = invisibleframes;
                ph--;
                phbb.innerText = ph + "/" + phm;
                sfx("boom");
            }
        }
    });
    if (bullets.length > 100) bullets.shift();
    if (hj) {
        ctx.fillStyle = bossColor;
        ctx.fillRect(bossX, bossY, bossW, bossH);
        let sticksSprite = new Image();
        sticksSprite.src = "../images/sticksgbg.png";
        if(finalBossMode) ctx.drawImage(sticksSprite,bossX + 5, bossY + 5, bossW - 10, bossH - 10)
    }
    requestAnimationFrame(update);
};

let byap;

const bossReady = () => {
    if (!fbd) {
        let gugugu = setInterval(() => {
            document.querySelector(".boss-dialogue img").style.transform =
                "rotate(" + oiiooi + "deg)";
            oiiooi = oiiooi * 1.1;
        });
        setTimeout(() => {
            document.querySelector(".boss-dialogue img").style.opacity = "0";
            bossLi.style.display = "block";
            bossLi.innerText = "他不見了?!";
        }, 1500);
        setTimeout(() => {
            update();
            bossLi.innerText = "...";
            bossFightStarting = true;
            document.querySelector("body").appendChild(canvas);
        }, 10000);
        setTimeout(() => {
            clearInterval(gugugu);
            document.querySelector(".boss-dialogue img").style.transform =
                "rotate(0deg)";
            bossLi.innerText = "WASD或方向鍵來移動";
            if (isMobile())
                bossLi.innerText = "使用手指移動「你」（那個綠色正方形）";
            hj = true;
        }, 15000);
        setTimeout(() => {
            bossLi.innerText = "你：啊你怎麼變長方形了";
        }, 20000);
        setTimeout(() => {
            bossX = canvas.width / 2;
            bossLi.innerText = "他：因為我爆炸了";
            byap = setInterval(() => {
                bossX += rng(6) - 3;
                bossY += rng(6) - 3;
            }, 200);
        }, 25000);
        setTimeout(() => {
            clearInterval(byap);
            bossFightMode = true;
            lbossFightMode = true;
            $.jStorage.set("bossFightMode", true);
            showHealthBars();
            music.src = "../sfx/nighthawk-Isolation.mp3";
            if (funMode) music.src = "../sfx/speedofpaul.mp3";
            music.play();
            fight();
        }, 30000);
        return;
    }
    document.querySelector("body").appendChild(canvas);
    update();
    idkAnymore = true
    hj = true
    canvas.style.zIndex = 500;
    canvas.style.position = 'fixed'
    bossLi.innerText = '我要破壞一切'
    bossFightMode = true;
    lbossFightMode = true;
    bossFightStarting = true;
    $.jStorage.set("bossFightMode", true);
    thingsThatFell.forEach(asd => asd.style.display = 'none')
    $('.boss-dialogue')[0].style.display = 'block'
    document.querySelector(".boss-dialogue img").style.opacity = "0";
    coolAnim()
    setTimeout(() => {
        bossLi.innerText = '你: 你怎麼把鍵盤從我平板上拔出來的'
        $('.dropdown')[0].style.display = 'none'
        $('.navbar')[0].style.display = 'none'
    }, 5000)
    setTimeout(() => {
        bossLi.innerText = '不管了就開始了'
    }, 7500)
    setTimeout(() => {
        keyboardDiv.style.animation = 'holy-this-is-very-cool-i-think 20s linear infinite normal, yummy 2.5s linear';
    }, 10000)
    setTimeout(() => {
        keyboardDiv.classList.add('eaten')
        keyboardDiv.display = 'none'
        keyboardDiv.remove()
        game.display = 'none'
        bossLi.style.display = 'none'
        showHealthBars();
        music.src = "../sfx/nighthawk-Isolation-remix.mp3";
        music.play();
    }, 12500)
};
