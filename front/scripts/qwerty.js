const qwerty = document.querySelector(".qwerty");
if (!$.jStorage.get('qwerty')) $.jStorage.set("qwerty", false);
let isQwerty = false;
const qwertyKeyboard = 'qwertyuiopasdfghjkl zxcvbnm  '
let keyboard = $('.keyboard')[0]
const changeToQwerty = () => {
    let keyboardDiv = document.querySelector(".keyboard");
    if(isQwerty) {
        qwerty.innerText = '使用 qwerty 鍵盤'
        keyboardDiv.innerHTML = ""
        for (let i = 97; i <= 122; i++) {
            let ib = i
            if(new Date().getDate() === 1 && new Date().getMonth() + 1 === 4) {
                ib++
                if(ib > 122) ib = 97
            }
            const button = document.createElement("button")
            button.style.setProperty('--position', ib - 96)
            button.innerText = String.fromCharCode(ib)
            keyboardDiv.appendChild(button)
            button.addEventListener('click', e => initGame(e.target, String.fromCharCode(ib)))
        }
        isQwerty = false
        $.jStorage.set("qwerty", isQwerty)
        console.log('changed to abc')
        $('.keyboard')[0].style.setProperty('--quantity', 26)
    } else {
        qwerty.innerText = '使用 abc 鍵盤'
        keyboardDiv.innerHTML = ""
        for (let i = 0; i <= qwertyKeyboard.length - 1; i++) {
            let ib = i
            if(new Date().getDate() === 1 && new Date().getMonth() + 1 === 4) {
                ib++
                if(ib > qwertyKeyboard.length - 1) ib = 0
            }
            const button = document.createElement("button")
            button.style.setProperty('--position', ib + 1)
            button.innerText = qwertyKeyboard[ib]
            if(button.innerText === ' ') {
                button.disabled = true
                button.style.opacity = '0'
                button.style.width = 'calc(100% / 9 - 20px)'
            }
            button.style.width = 'calc(100% / 9 - 10px)'
            keyboardDiv.appendChild(button)
            button.addEventListener('click', e => initGame(e.target, qwertyKeyboard[ib]))
        }
        isQwerty = true
        $.jStorage.set("qwerty", isQwerty)
        console.log('changed to qwerty')
        $('.keyboard')[0].style.setProperty('--quantity', 29)
    }
    document.querySelectorAll(`.keyboard button`).forEach(b => {
        b.style.border = '3px solid ' + $.jStorage.get('customKeyColor')
    })
    $.jStorage.set('qwerty', isQwerty)
}


qwerty.addEventListener('click', changeToQwerty) 
if($.jStorage.get('qwerty')) {
    qwerty.click()
}

const bounce = (element, hide) => {
    let y = 1
    let g = 1
    let bounceHighest
    let interv = setInterval(() => {
        if(element.getBoundingClientRect().y > window.innerHeight - element.getBoundingClientRect().height) {
            g = -g
            bounceHighest = window.innerHeight - 100
        }
        g++
        y+=g

        if(element.getBoundingClientRect().y < bounceHighest) bounceHighest = element.getBoundingClientRect().y
        
        if(element.getBoundingClientRect().y > window.innerHeight - element.getBoundingClientRect().height && g > 0 && bounceHighest >= window.innerHeight - 100) {
            clearInterval(interv)
        }
        element.style.transform = `translateY(${y}px)`
    }, 10)
    if(typeof hide === 'number' || hide instanceof Number) {
        setTimeout(() => {
            element.style.opacity = 0
        }, hide)
    }
}

let bounceAll = () => {
    document.body.querySelectorAll('*').forEach(e => {
        bounce(e)
    })
    setTimeout(() => {
        $('.navbar')[0].style.display = 'none'
        $('.container')[0].style.display = 'none'
    }, 10000)
}

const coolAnim = () => {
    $('.keyboard')[0].style.setProperty('--quantity', isQwerty?29:26)
    $('.keyboard')[0].classList.add('slider')
    document.querySelectorAll('.keyboard button').forEach(b => {
        b.style.width = '50px'
        b.style.height = '50px'
    })
}
// coolAnim()
