document.querySelector(".navbar audio").play();
let isMuted = false;
const muteMusic = () => {
    if (!isMuted) {
        document.querySelector(".navbar audio").muted = true;
        document.querySelector(".navbar audio").pause();
        isMuted = true;
        document.getElementById("mute").innerText = "開音樂";
        document.getElementById("mute2").innerText = "開音樂";
    } else {
        document.querySelector(".navbar audio").muted = false;
        document.querySelector(".navbar audio").play();
        isMuted = false;
        document.getElementById("mute").innerText = "關音樂";
        document.getElementById("mute2").innerText = "關音樂";
    }
};
