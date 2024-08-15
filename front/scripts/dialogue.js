document.querySelector(".dialogue .content img").src = null
let dialogueModal = document.querySelector(".dialogue");
let dialogueContent = document.querySelector(".dialogue .content");
let characters = [
    {
        name: "店員",
        id: "shopkeeper",
        statusMaxIndex: 1,
        idleIndex: 0,
    },
    {
        name: "???",
        id: 'mystery',
        statusMaxIndex: 0,
        idleIndex: 0,
    },
    {
        name: '西瓜貓',
        id: 'cat',
        statusMaxIndex: 0,
        idleIndex: 0,
    },
    {
        name: '阿蛋',
        id: 'egg',
        statusMaxIndex: 0,
        idleIndex: 0,
    },
    {
        name: '柴柴',
        id: 'sticks',
        statusMaxIndex: 0,
        idleIndex: 0,
    }
];

characters.forEach((c) => (c.statusAmount = c.statusMaxIndex + 1));

let dialogueQueue = [];

const pd = (character, text, speed, onclick, buttons, promptText, pc, textStyle, sound) => {
    if(typeof speed === 'object' || speed instanceof Object) {
        onclick = speed.onclick
        buttons = speed.buttons
        promptText = speed.promptText
        pc = speed.pc
        textStyle = speed.textStyle
        sound = speed.sound
        speed = speed.speed
    }
    if(typeof character === 'string' || character instanceof String) {
        character = characters.find((c) => c.id === character)
    }
    if(typeof character === 'number' || character instanceof Number) {
        character = characters[character]
    }
    dialogueQueue.push({
        character, text, speed, onclick, buttons, promptText, pc, textStyle, sound
    })
}

const dialogue = (d) => {
    let { character, text, speed, onclick, buttons, promptText, pc, textStyle, sound } = d[0]
    if(sound) sfx(sound)
    if (!character || !text) return alertModal("ERROR");
    let dialogueTextBox = document.querySelector(".dialogue .content .text-box");
    let characterImg = document.querySelector(".dialogue .content img");
    let characterName = document.querySelector(
        ".dialogue .content .text-box .name",
    );
    let dialogueText = document.querySelector(
        ".dialogue .content .text-box .dialogue-text",
    );
    dialogueText.className = 'dialogue-text'
    characterName.innerText = character.name;
    if(promptText) {
        let r = prompt(promptText)
        while(!r) {
            alert('你要寫東西啊')
            r = prompt(promptText)
        }
        text = text.replaceAll('{prompt}', r)
        if(pc) pc(r)
    }
    dialogueText.innerHTML = "";
    let i = text.length;
    let si = 1;
    dialogueModal.classList.add("show");
    text = text.trim();
    const { statusMaxIndex, idleIndex, statusAmount } = character;
    if(typeof buttons === 'array' || buttons instanceof Array) {
        let e = setInterval(() => {
            if(i > 0) return;
            buttons.forEach(button => {
                let b = document.createElement('button')
                b.classList.add('dialogueButton')
                b.innerText = button.text
                b.onclick = () => {
                    if(dialogueQueue.length > 1) {
                        dialogueQueue.shift();
                        dialogue(dialogueQueue)
                    } else {
                        dialogueModal.classList.remove("show");
                    }
                    b.disabled = true;
                    if(button.callback) {
                        dialogueQueue.shift()
                        button.callback()
                    }
                    document.querySelectorAll('.dialogueButton').forEach(bb => bb.remove())
                }
                dialogueTextBox.append(b)
            })
            clearInterval(e)
        })
    }
    
    let j = setInterval(() => {
        if (i > 0) {
            if (statusMaxIndex >= 1 || statusAmount > 1) {
                characterImg.src = `../images/characters/${character.id}/${character.id}${si}.png`;
            }
            dialogueText.innerHTML += text.charAt(text.length - i);
            i--;
        } else {
            characterImg.src = `../images/characters/${character.id}/${character.id}${idleIndex}.png`;
            clearInterval(j);
        }
    }, speed || 100);
    if(typeof textStyle === 'string' || textStyle instanceof String) dialogueText.classList.add(textStyle)
    else if(typeof textStyle === 'array' || textStyle instanceof Array) {
        textStyle.forEach(style => dialogueText.classList.add(style))
    }
    let jin = setInterval(() => {
        if (i > 0) {
            dialogueModal.onclick = () => {
                if (i > 0) {
                    console.log("e");
                    i = 0;
                    clearInterval(j);
                    dialogueText.innerHTML = text;
                }
            };
            return;
        }
        if(buttons) return
        if(dialogueQueue.length > 1) {
            dialogueModal.onclick = () => {
                if (i > 0) return;
                clearInterval(jin)
                dialogueQueue.shift();
                dialogue(dialogueQueue)
                if(onclick) {
                    dialogueQueue.shift()
                    onclick()
                }
                dialogueModal.onclick = null;
            };
            return
        }
        dialogueModal.onclick = () => {
            if (i > 0) return;
            clearInterval(jin)
            dialogueModal.classList.remove("show");
            dialogueQueue.shift()
            if(onclick) onclick()
            dialogueModal.onclick = null;
        };
    });
};

if(date(7,26)) {
    pd(characters[0], '聽說今天是迪米生日')
    pd(characters[0], '我們祝他生日快樂吧!')
    pd(characters[0], '生日快樂!', 100, () => {
        confetti({
            particleCount: antilag? 50 : 200,
            spread: 360,
            origin: { y: 0.6 },
        });
        giveAch('birthday')
    })
    dialogue(dialogueQueue)
}
let dq = () => dialogue(dialogueQueue)

const hardModeActivation = () => {
    pd(0, '你終於打敗了那個白癡')
    pd(1, '他怎麼辦到的')
    pd(0, '不知道')
    pd(0, '我把詞彙難度調高了看會發生什麼事')
    pd(1, '我看了真的難到爆')
    pd(0, '只有300多個而已啦')
    pd(1, '要確')
    pd(1, '那些有80%平常基本上不會用到')
    pd(0, '好吧，靠你了')
    pd(0, '喔對，時光機現在被加強了')
    pd(0, '可以時間回朔五次')
    dq()
}