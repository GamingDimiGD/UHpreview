let muted = false;
const sfx = (sound) => {
    sound = '../sfx/' + sound + '.mp3'
    if(muted) return
    let audio = new Audio(sound)
    audio.play()
}