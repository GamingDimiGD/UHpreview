let bh = 5000
let ph = 10
// its short for player health

let bhm = 5000
let phm = 10

const phb = document.querySelector('.phb')
const bhb = document.querySelector('.bhb')

const phbb = document.querySelector('.phb b')
const bhbb = document.querySelector('.bhb b')

// boss (type) bullets

// default
let bdb = []

// horizontal
let bhba = []

// diagonal
let bdib = []

// top
let btb = []

// lasers
let dlaser = [] // default
let vlaser = [] // vertical
let slaser = [] // shoot

let minigamemode = false

const showHealthBars = () => {
    const healthBars = document.querySelectorAll('.health-bar');
    phbb.innerText = ph + '/' + phm
    bhbb.innerText = bh + '/' + bhm
    healthBars.forEach(healthBar => {
        healthBar.style.display = 'block';
        healthBar.style.opacity = 1;
    });
    bossLi.style.display = "none"
};

const bossTP = (bX, bY) => {
    bossX = bX
    bossY = bY
}

const bossGetRandomWord = () => {
    minigamemode = true
    vocab = oVocab
    game.style.display = 'flex'
    game.style.position = 'absolute'
    document.querySelector('.hangman-box').style.opacity = '0'
    getRandomWord()
    vocab = []
    clearInterval(bi)
    changeToQwerty()
    changeToQwerty()
    let wtuiouio = setInterval(() => {
        if(!minigamemode) {
            if(bh <= 0) endFight()
            else fight()
            clearInterval(wtuiouio)
        }
    }, 250)
}

const endFight = () => {
    if(isGameOver) return
    isGameOver = true
    document.head.querySelectorAll('meta')[2].content = 'width=device-width, initial-scale=1'
    vocab = oVocab
    vocabAmount = 0
    canvas.width = 0
    canvas.height = 0
    let heheheh = document.createElement('img')
    heheheh.src = '../images/hahalol.gif'
    heheheh.style.width = '100%'
    document.body.appendChild(heheheh)
    bossFightMode = false
    bossFightBadge = true
    $.jStorage.set('bossFightBadge', true)
    setTimeout(() => {
        gameOver(true)
        modalText = '你把柴柴（白色方形）打敗了！'
        wordmeaning = glitch(10)
        let asdf = glitch(2) + '重來' + glitch(2)
        document.querySelector('.content h4').innerText = '你贏了！！！'
        document.querySelector('.content p#ans').innerHTML = `<p id="ans">${modalText}<b>${currentWord}</b> </p>`
        document.querySelector('.content p#meaning b').innerText = wordmeaning
        document.querySelector('.play-again').innerText = '好棒！'
        pab.removeEventListener('click', getRandomWord)
        pab.addEventListener('click', () => {
            window.location.reload()
        });
    }, 10000)
    giveAch('bossFightBadge')
}

const fight = () => {
    if(!bossFightMode || isGameOver) return
    bossShootBullets()
    setTimeout(() => bossShootBullets('all', 4, 4, 200, 50), 500)
    setTimeout(() => bossTP(rng(canvas.width), rng(canvas.height)), 1000)
    setTimeout(() => bossTP(rng(canvas.width), rng(canvas.height)), 2000)
    setTimeout(() => bossTP(rng(canvas.width), rng(canvas.height)), 3000)
    setTimeout(() => bossTP(canvas.width / 2, canvas.height / 2), 4000)
    setTimeout(() => bossLaser(), 4000)
    setTimeout(() => bossShootBullets('all', 15, 15, 10000, 1, 10), 5000)
    setTimeout(() => {
        let timelastframe = []
        let fasdfjk = setInterval(() => {
            timelastframe.push(Date.now())
            let deltatime = 1
            if(timelastframe.length > 1) {
                deltatime = (timelastframe[timelastframe.length - 1] - timelastframe[timelastframe.length - 2]) / 15
            }
            timelastframe = timelastframe.slice(-2)
            bossX -= 10 * deltatime
            if(bossX < 60) clearInterval(fasdfjk)
        })
    }, 6000)
    setTimeout(() => {
        let timelastframe = []
        let fasdfjk = setInterval(() => {
            timelastframe.push(Date.now())
            let deltatime = 1
            if(timelastframe.length > 1) {
                deltatime = (timelastframe[timelastframe.length - 1] - timelastframe[timelastframe.length - 2]) / 15
            }
            bossX += 10
            if(bossX > canvas.width / 2) clearInterval(fasdfjk)
        }, 10)
        let fasdfjk2 = setInterval(() => {
            timelastframe.push(Date.now())
            let deltatime = 1
            if(timelastframe.length > 1) {
                deltatime = (timelastframe[timelastframe.length - 1] - timelastframe[timelastframe.length - 2]) / 15
            }
            bossY -= 10
            if(bossY < canvas.height / 2) clearInterval(fasdfjk2)
        }, 10)
    }, 8000)
    setTimeout(() => {
        bossShootBullets('all', 15, 15, 10000, 1, 10)
        let olololo = 0
        let fasdfjk = setInterval(() => {
            bossTP(rng(canvas.width), rng(canvas.height))
            olololo++
            if(olololo > 10) clearInterval(fasdfjk)
        }, 1000)
    }, 10000)
    setTimeout(bossGetRandomWord, 21000)
}

let asdfjkasdf = setInterval(() => {
    if (bh <= 0) {
        endFight()
        clearInterval(asdfjkasdf)
    }
}, 200)


let backslash = String.fromCharCode(92)
console.log(`
                              ill update later




                            /${backslash}
                           /  ${backslash}
__________________________/____${backslash}_____________________________`)