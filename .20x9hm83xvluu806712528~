if($.jStorage.get('vocabAmount')) $.jStorage.set('playedBefore', true)
let rg = (object, time) => {
    object.style.border = '10px solid red'
    if(object === document.querySelector('.word-display')) {
        object.style.paddingTop = '30px'
        object.style.paddingBottom = '-30px'
    }
    if(time === 'infinite') return
    if(time === false) time = 0
    setTimeout(() => {
        if(object === document.querySelector('.word-display')) {
            object.style.paddingTop = '0px'
            object.style.paddingBottom = '0px'
        }
        object.style.border = 'none'
    }, time || 2000)
}

let tutorial2 = () => {
    document.querySelector(".play-again").click()
    pd(characters[1], '很棒!你贏了!')
    pd(characters[1], '你得到的閃可以拿來幹嘛呢?')
    pd(characters[0], '哈囉')
    pd(characters[1], '你怎麼來了')
    pd(characters[1], '我在教他怎麼玩欸')
    pd(characters[0], '我是冷凍知識庫的店員')
    pd(characters[0], '你按三條線然後按商城，最後按冷凍知識庫', 100, () => {
        rg(document.querySelector('.toggle'), 'infinite')
        rg(document.getElementById('shop'), 'infinite')
        rg(document.querySelector('.knowledge-button'), 'infinite')
        document.querySelector('.knowledge-button').onclick = () => {
            rg(document.querySelector('.toggle'), 0)
            rg(document.getElementById('shop'), 0)
            rg(document.querySelector('.knowledge-button'), 0)
            pd(characters[0], '我現在還賣很少東西')
            pd(characters[0], '隔壁那一家你也可以自己去看')
            pd(characters[0], '可是他們怪怪的...', 100, undefined, undefined, undefined, undefined, 'red')
            pd(characters[1], '你也是', 100, undefined, undefined, undefined, undefined, 'bigtext')
            pd(characters[1], '好吧，剩下的東西就靠你了')
            pd(characters[1], '欸店員我要一瓶飲料', 100, undefined, undefined, undefined, undefined, 'smalltext')
            dialogue(dialogueQueue)
            $.jStorage.set('playedBefore', true)
            document.querySelector('.knowledge-button').onclick = () => {
                document.querySelector('.knowledge-modal').classList.add('show')
                document.querySelector('.market').classList.remove('show')
            }
        }
        
    })
    dialogue(dialogueQueue)
}

let tutorial = () => {
    pd(characters[1], `哈囉!我是${glitch(5)}`)
    pd(characters[1], '我現在要教你怎麼玩這遊戲')
    pd(characters[1], '喔對你需要我教嗎', 100, undefined, [
        {
            text: '需要',
            callback: () => {
                pd(characters[1], '好')
                pd(characters[1], '首先，這是是你的鍵盤', 75, () => {
                    document.querySelector('.update-modal').classList.remove('show')
                    document.querySelector('.daily-login').classList.remove('show')
                    rg(keyboardDiv)
                    setTimeout(() => {
                        pd(characters[1], '然後這是提示', 100, () => {
                            rg(document.querySelector('.hint-text'))
                            setTimeout(() => {
                                pd(characters[1], '這個是你要猜出的英文單字', 100, () => {
                                    rg(document.querySelector('.word-display'))
                                    setTimeout(() => {
                                        pd(characters[1], '你要按鍵盤來猜單字')
    /* Nice piramid ya got here */      pd(characters[1], '你有六次答錯的機會')
                                        pd(characters[1], '如果你答對，你的閃(✧)會增加至少10個', 100, () => {
                                            rg(document.querySelector('.sparkles-display'))
                                            setTimeout(() => {
                                                pd(characters[1], '你來挑戰一場吧!', 100, () => {
                                                    let jhon = setInterval(() => {
                                                        if(tutwin) {
                                                            tutorial2()
                                                            clearInterval(jhon)
                                                        }
                                                    })
                                                })
                                                dialogue(dialogueQueue)
                                            }, 2000)
                                        })
                                        dialogue(dialogueQueue)
                                    }, 2000)
                                })
                                dialogue(dialogueQueue)
                            }, 2000)
                        })
                        dialogue(dialogueQueue)
                    }, 2000)
                })
                dialogue(dialogueQueue)
            }
        },
        {
            text: '不需要',
            callback: () => {
                pd(characters[1], '那你就自己玩吧!')
                dialogue(dialogueQueue)
                $.jStorage.set('playedBefore', true)
            }
        }
    ])
    dialogue(dialogueQueue)
}

if(!$.jStorage.get('playedBefore')) tutorial()