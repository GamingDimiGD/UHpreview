const fun = () => {
    versionText.style.color = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
    hangman.style.color = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
    document.querySelector('.game-modal').style.transition = "unset"
    document.querySelector('.game-modal .content').style.backgroundColor = `rgb(${rng((rmv + 1) / 4)},${rng((rmv + 1) / 4)},${rng((rmv + 1) / 4)})`
    pab.style.color = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
    keyboardDiv.querySelectorAll('button').forEach(btn => {
        btn.style.background = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
        btn.style.transition = "unset"
        if (btn.disabled) btn.style.background = `rgb(${rng((rmv + 1) / 4)},${rng((rmv + 1) / 4)},${rng((rmv + 1) / 4)})`
        if (rmv === 0 && btn.disabled) btn.style.opacity = '0'
        btn.style.margin = `-${rng(2)}px`
    })
    qwerty.style.transition = `unset`
    qwerty.style.background = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
    if (qwerty.disabled) qwerty.style.background = `rgb(${rng((rmv + 1) / 4)},${rng((rmv + 1) / 4)},${rng((rmv + 1) / 4)})`
    document.querySelector('.navbar').style.color = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
    document.querySelector('.navbar').style.background = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
    if (rmv === 0) {
        document.querySelector('.navbar').style.background = `#0f0`
        document.querySelector('.content').style.background = `#fff`
    }
    document.querySelector('.title').style.marginLeft = `${rng(100)}%`
    document.querySelector('.title').style.marginTop = `${rng(100)}%`
    document.querySelector('.title').style.color = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
}