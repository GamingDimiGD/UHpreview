const glitch = (amount) => {
    let text = ''
    for (amount; amount > 0; amount--) {
        const random = Math.floor(Math.random() * 65536);
        text = text + String.fromCharCode(random);
    }
    return text
}

let picksceell = () => {
    setInterval(() => {
        for (let e of document.querySelectorAll('*')) {
            e.style.color = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
            e.style.background = `rgb(${rng(rmv)},${rng(rmv)},${rng(rmv)})`
            e.style.fontSize = `${rng(500)}px`
            e.style.width = `${rng(500)}px`
            e.style.height = `${rng(500)}px`
        }
        document.querySelectorAll('p').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('tspan').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('h1').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('h6').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('span').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('h2').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('a').forEach(p => p.innerText = glitch(rng(10)))
        document.querySelectorAll('b').forEach(p => p.innerText = glitch(rng(10)))
    }, antiLag?100:0)
}