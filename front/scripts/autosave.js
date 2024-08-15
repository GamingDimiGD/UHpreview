const autosaveIndicator = document.querySelector('.autosave-text')
const saveButton = document.getElementById('save')
const saveButton2 = document.getElementById('save2')

const save = () => {
    $.jStorage.set('vocab', vocab)
    $.jStorage.set('vocabAmount', vocabAmount)
    autosaveIndicator.innerText = '已儲存👍'
    autosaveIndicator.style.color = '#0f0'
    saveButton.innertext = '已儲存👍'
    saveButton2.innerText = '已儲存👍'
    setTimeout(() => {
        autosaveIndicator.innerText = autosaveText
        autosaveIndicator.style.color = '#000'
        saveButton.innerText = '儲存'
        saveButton2.innerText = '儲存'
    }, 1000)
}
setInterval(() => {
    stats.innerHTML = ''
    $.jStorage.set('data', data)
    for (const prop in data) {
        const span = document.createElement('span');
        span.innerText = `${dataCH[prop]}: ${data[prop]}`;
        stats.appendChild(span);
    }
})

setInterval(save, 10000)