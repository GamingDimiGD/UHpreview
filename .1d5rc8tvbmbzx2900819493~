const undoBut = document.querySelector(".undo");
const buyUndoButton = document.querySelector('.buy-undo')
const amountDisplay = document.querySelector('.amount-display')
let undoAmounts = 2
let undoAmountsLeft = undoAmounts
amountDisplay.innerText = `剩${undoAmountsLeft}次`
if ($.jStorage.get("undo")) {
    buyUndoButton.remove()
    amountDisplay.style.display = 'unset'
}
let undoTest = false;
const undo = () => {
    if (!$.jStorage.get("undo") && !undoTest) return;
    if(undoAmountsLeft <= 0) {
        pd(0, '時光機需要休息!')
        dq()
        return false;
    }
    let last = clickedLetters[clickedLetters.length - 1];
    if(!last) {
        pd(0, '你還沒開始猜字母不能時間回朔')
        dq()
    }
    if (last.isCorrect) {
        pd(characters[0], "你幹嘛贏了還時間回朔");
        dialogue(dialogueQueue);
        return false;
    }
    wrongGuessCount--;
    undoAmountsLeft--;
    if (wrongGuessCount > 6) wrongGuessCount = 6;
    document.querySelector(".guesses-text b").innerText =
        wrongGuessCount + " / " + maxGuesses;
    document.querySelector(".hangman-box img").src =
        `../images/hangman-${wrongGuessCount}.png`;
    document.querySelector(".hangman-box h6").innerText = version;
    last.button.disabled = false;
    clickedLetters.pop();
    amountDisplay.innerText = `剩${undoAmountsLeft}次`
    if (undoTest) {
        undoTest = false;
        setTimeout(() => {
            pd(0, "欸真的有用欸");
            pd(3, "你對講機有眼睛喔");
            pd(0, "答對了");
            pd(0, "他有鏡頭");
            pd(1, "真的嗎");
            pd(3, "所以你真知道我是一顆蛋");
            pd(0, "你身上還有裂痕");
            pd(3, "我剛剛破窗弄到的");
            pd(0, "活該", {
                textStyle: "bigtext",
            });
            pd(0, "你要賠我一個窗戶");
            pd(3, "好啦好啦之後再說啦");
            pd(3, "喔對我是不會閃的快閃閃店的老闆");
            pd(1, "不要強迫推銷謝謝");
            pd(1, "回去你的店吧阿蛋");
            pd(3, "好掰掰");
            pd(0, "掰");
            pd(1, "欸你飲料很好喝欸", {
                textStyle: "smalltext",
            });
            dq();
            $.jStorage.set("undo", true);
        }, 1000);
    }
    if (clickedLetters.length === 0) undoBut.disabled = true;
    return true;
};
const buyUndo = () => {
    if ($.jStorage.get("sparkles") < 500 || !$.jStorage.get("sparkles")) {
        pd(characters[0], "你沒有足夠的閃啦");
        pd(characters[0], "我需要500閃才能去買時光機素材");
        dialogue(dialogueQueue);
        return;
    }
    takeSparkles(500);
    buyUndoButton.remove()
    pd(0, "感謝你的閃");
    pd(0, "我買好了素材");
    pd(1, "那麼快嗎");
    pd(0, "我走路很快");
    pd(1, "假的");
    pd(0, "阿蛋這什麼聲音", {
        sound: "BREAK",
        textStyle: "bigtext",
    });
    pd(3, "你怎麼知道我名字");
    pd(0, "??????", { textStyle: "bigtext" });
    pd(1, "?????????", { textStyle: "bigtext" });
    pd(0, "呃");
    pd(1, "你不知道那裡有門嗎");
    pd(3, "不知道");
    pd(3, "所以那個對講機到底怎麼知道我名字");
    pd(0, "我不想罵髒話");
    pd(0, "我都把髒話用蛋來替代");
    pd(3, "然後那個機器是什麼鬼");
    pd(0, "時光機，用來時間回朔");
    pd(3, "要試試看嘛");
    pd(0, "那是給玩家用的");
    pd(3, "誰是玩家");
    pd(0, "旁邊那位拿著平板的");
    pd(3, "欸玩家我怎麼都沒注意到你");
    pd(1, "你眼瞎吧");
    pd(1, "或他站比較遠一點");
    pd(0, "有嗎");
    pd(0, "好不要鬧了你快點用用看時光機");
    undoTest = true;
    dq();
};
