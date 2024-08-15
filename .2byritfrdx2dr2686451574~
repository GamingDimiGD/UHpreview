let balls = false
const newBlock = () => {
    let timelastframe = []
    let canvas = document.createElement("canvas");
    canvas.style.position = 'fixed'
    canvas.style.top = 0
    canvas.style.left = 0
    canvas.style.zIndex = -1
    canvas.classList = 'block'
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    let x = rng(window.innerWidth - 70);
    let y = rng(window.innerWidth - 70);
    let vx = 5 * rng(1, -1);
    let vy = 5 * rng(1, -1);
    if(vx === 0) vx = 5
    if(vy === 0) vy = -5
    let text = String.fromCharCode(rng(122, 97));
    let v = vocab[rng(vocab.length - 1)].word
    const animate = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(x, y, 70, 70);
        ctx.fillStyle = "#003c00";
        ctx.fillRect(x + 10, y + 10, 50, 50);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Noto Sans TC";
        ctx.fillText(text.toUpperCase(), x + 28, y + 42);
        timelastframe.push(Date.now())
        let deltatime = 1
        if(timelastframe.length > 1) {
            deltatime = (timelastframe[timelastframe.length - 1] - timelastframe[timelastframe.length - 2]) / 15
        }
        timelastframe = timelastframe.slice(-2)
        x += vx * deltatime;
        y += vy * deltatime;
        if(balls === true)console.log(Math.floor(vx * deltatime), Math.floor(vy * deltatime), timelastframe)
        ctx.fillText(v, x, y + 90);
        if (x >= canvas.width - 70 || x <= 0) {
            text = String.fromCharCode(rng(122, 97))
            vx = -vx;
            if(x >= canvas.width - 70) x = canvas.width - 70
            else if(x <= 0) x=0
            v = oVocab[rng(oVocab.length - 1)].word
        }
        if (y >= canvas.height - 70 || y <= 0) {
            text = String.fromCharCode(rng(122, 97))
            vy = -vy;
            if(y >= canvas.height - 70) y = canvas.height - 70
            else if(y <= 0) y=0
            v = oVocab[rng(oVocab.length - 1)].word
        }
        if(v.word === currentWord) {
            while(v.word === currentWord) {
                v = oVocab[rng(oVocab.length - 1)].word
            }
        }
        requestAnimationFrame(animate);
    };
    animate();
}
const removeAllBlocks = () => {
    document.querySelectorAll('canvas.block').forEach(c => document.body.removeChild(c))
}
let ask
const followMouse = (e, canvas, ctx, ask) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
    if(canvas.height !== window.innerHeight) canvas.height = window.innerHeight
    let x = e.clientX;
    let y = e.clientY;
    ctx.fillStyle = ask;
    ctx.beginPath()
    ctx.arc(x + 10, y + 15, 50, 0, 2 * Math.PI);
    ctx.fill()
}
let fmrainbow = false;
let image;
let dynamicBGList = [
    {
        play: () => {},
        remove: () => {}
    },
    {
        play: newBlock,
        remove: removeAllBlocks
    },
    {
        play: () => {
            let canvas = document.createElement("canvas");
            canvas.style.position = 'fixed'
            canvas.style.top = 0
            canvas.style.left = 0
            canvas.style.zIndex = -1
            canvas.classList = 'bg'
            document.body.appendChild(canvas);
            let ctx = canvas.getContext("2d");
            ask = prompt("請輸入游標顏色 (和自訂鍵盤邊框顏色一樣)")
            if(!ask) ask = '#00ff00'
            if(ask.toLowerCase() === 'rainbow' || ask.toLowerCase() === '彩虹') fmrainbow = true
            addEventListener('mousemove', e => {
                followMouse(e, canvas, ctx, ask)
            })
        },
        remove: () => {
            document.body.removeChild(document.querySelector('canvas.bg'))
        }
    },
    {
        play: () => {
            image = document.createElement("div")
            image.style.backgroundImage = 'url(../images/gdpattern.png)'
            image.style.zIndex = -1
            image.style.position = 'fixed'
            image.style.animation = 'slide 5s linear infinite'
            image.style.top = 0
            image.style.left = 0
            image.style.width = '7900px'
            image.style.height = '7900px'
            image.style.backgroundRepeat = 'repeat'
            document.body.append(image)
        },
        remove: () => {
            document.body.removeChild(image)
        }
    }
]