const alist = document.querySelector('.alist')
const notif = document.querySelector('.notification')
const aa = document.getElementById('aa')
const yaa = document.getElementById('yaa')

let achievements = [
    {
        name: '遊戲救世主',
        description: '恭喜打敗柴柴！',
        id: 'bossFightBadge',
        reward: 2147,
    },
    {
        name: '發生什麼事了',
        description: '蛤?我買了什麼?',
        id: 'gb',
        reward: rng(300, 0),
    },
    {
        name: '贏家',
        description: '贏一局遊戲',
        id: 'won',
        reward: 50,
    },
    {
        name: '我英文很好',
        description: '成功贏得5連勝',
        id: '5streak',
        reward: 150,
    },
    {
        name: '厲害的10連勝',
        description: '成功贏得10連勝',
        id: '10streak',
        reward: 300,
    },
    {
        name: '不可能的任務',
        description: '成功贏得50連勝',
        id: '50streak',
        reward: 750,
    },
    {
        name: '我詞彙量還好',
        description: '擁有100詞彙',
        id: '100words',
        reward: 500,
    },
    {
        name: '四分之一強',
        description: '累積500詞彙量',
        id: '500words',
        reward: 500,
    },
    {
        name: '學生程度',
        description: '擁有1000詞彙量',
        id: '1kwords',
        reward: 1000
    },
    {
        name: 'Endgame',
        description: 'Have all the vocabulary',
        id: 'endgame',
        reward: 2000,
    },
    {
        name: '好好玩⋯⋯',
        description: '找到好玩模式',
        id: 'fun',
        reward: 420,
    },
    {
        name: '有✧人',
        description: '擁有1000✧',
        id: '1ksparkles',
        reward: 1,
    },
    {
        name: '好亮',
        description: '擁有10000✧',
        id: '10ksparkles',
        reward: 1,
    },
    {
        name: '大富翁',
        description: '擁有100000✧',
        id: '100ksparkles',
        reward: 0,
    },
    {
        name: '西瓜貓',
        description: '領養西瓜貓 (喵)',
        id: 'cat',
        reward: 0,
    },
    {
        name: '新環境',
        description: '更改所有外觀 (我不記得遊戲長這樣啊)',
        id: 'new',
        reward: 20,
    },
    {
        name: '被騙了',
        description: '我真的會謝',
        id: 'scammed',
        reward: 0,
    },
    {
        name: '真的很好玩',
        description: '連登五天',
        id: '5days',
        reward: 50,
    },
    {
        name: '迷上了',
        description: '連登十天',
        id: '10days',
        reward: 100,
    },
    {
        name: '你玩多久了',
        description: '連登十五天',
        id: '15days',
        reward: 150,
    },
    {
        name: '一個月過了',
        description: '連登30天',
        id: '30days',
        reward: 300,
    },
    {
        name: '時間過好快',
        description: '連登100天',
        id: '100days',
        reward: 1000,
    },
    {
        name: '一歲',
        description: '連登365天',
        id: '365days',
        reward: 5000,
    },
    {
        name: 'APRIL FOOLS LOL',
        description: '愚人節快樂:)',
        id: 'af',
        reward: 69,
    },
    {
        name: '生日快樂!',
        description: '是迪米生日欸',
        id: 'birthday',
        reward: 726,
    }
]

aa.innerText = achievements.length

let showNotif = (text, time) => {
    if(!time) time = 5
    notif.querySelector('p').innerText = text
    notif.style.opacity = '1'
    setTimeout(() => {
        notif.style.opacity = '0'
    }, time * 1000)
}

let playerAchievements = []
const checkAchievements = () => {
    playerAchievements = []
    achievements.forEach(a => {
        if ($.jStorage.get(a.id) === true) playerAchievements.push(a)
    })
    alist.innerHTML = ''
    yaa.innerText = playerAchievements.length
    if(!playerAchievements[0]) {
        alist.innerHTML = '<h3>你還沒有任何成就！</h3>'
        return
    }
    playerAchievements.forEach(a => {
        let li = document.createElement('li')
        li.innerHTML = `${a.name} - <b>${a.description}</b>`
        li.classList.add('achievement')
        alist.appendChild(li)
    })
}
checkAchievements()

const giveAch = (id) => {
    if($.jStorage.get(id) === true) return
    $.jStorage.set(id, true)
    giveSparkles(achievements.find(a => a.id === id).reward)
    showNotif('你獲得新成就！')
    checkAchievements()
}

if(!$.jStorage.get('achSparklesGiven')) {
    playerAchievements.forEach(a => {
        giveSparkles(a.reward)
    })
    $.jStorage.set('achSparklesGiven', true)
}
let e = 0
achievements.forEach((a) => {
    e+=a.reward
})
console.log(e)