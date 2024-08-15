if(!$.jStorage.get("loginStreak")) $.jStorage.set('loginStreak', 0)
if(!$.jStorage.get("loginTime")) $.jStorage.set('loginStreak', Date.now())
const day = 1000 * 60 * 60 * 24
const ls = document.getElementById('loginStreak')
ls.innerText = $.jStorage.get('loginStreak')
let dlm = document.querySelector('.daily-login')
let dlp = dlm.querySelector('.content .perks')

if(Date.now() - $.jStorage.get("loginTime") > day && Date.now() - $.jStorage.get("loginTime") < day * 2) {
    $.jStorage.set('loginStreak', $.jStorage.get("loginStreak") + 1)
    $.jStorage.set('loginTime', Date.now())
    ls.innerText = $.jStorage.get('loginStreak')
    giveSparkles(50)
    dlm.classList.add('show')
    if(data.bestLoginStreak < $.jStorage.get('loginStreak')) data.bestLoginStreak = $.jStorage.get('loginStreak')
} else if(Date.now() - $.jStorage.get("loginTime") > day * 2) {
    $.jStorage.set('loginStreak', 0)
    $.jStorage.set('loginTime', Date.now())
    ls.innerText = $.jStorage.get('loginStreak')
    dlm.classList.add('show')
}

for (let i = $.jStorage.get('loginStreak'); i < $.jStorage.get('loginStreak') + 365; i++) {
    let perk = document.createElement('div')
    let img = document.createElement('img')
    img.src = '../images/sparkles.png'
    let txt = document.createElement('h2')
    if(i+1 === 5) img.src = '../images/x2.png'
    if(i+1 === 10) img.src = '../images/x3.png'
    if(i+1 === 15) img.src = '../images/x4.png'
    if(i+1 === 30) img.src = '../images/x5.png'
    if(i+1 === 100) img.src = '../images/x10.png'
    if(i+1 === 365) img.src = '../images/x999.png'
    txt.innerText = '第' + (i + 1) + '天'
    perk.appendChild(img)
    perk.appendChild(txt)
    dlp.appendChild(perk)
}

if($.jStorage.get('loginStreak') >= 5) giveAch('5days')
if($.jStorage.get('loginStreak') >= 10) giveAch('10days')
if($.jStorage.get('loginStreak') >= 15) giveAch('15days')
if($.jStorage.get('loginStreak') >= 30) giveAch('30days')
if($.jStorage.get('loginStreak') >= 100) giveAch('100days')
if($.jStorage.get('loginStreak') >= 365) giveAch('365days')