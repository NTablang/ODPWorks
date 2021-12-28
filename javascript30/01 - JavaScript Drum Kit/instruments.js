const instruments = document.querySelectorAll(".key");

// For clicking
instruments.forEach((instrument) => {
    instrument.addEventListener("click", e => {
        instrument.classList.add("playing");
        
        let audioKey = instrument.dataset.key
        let audio = document.querySelector(`audio[data-key="${audioKey}"]`);
        audio.play();
        
        setTimeout(() => {
            instrument.classList.remove("playing");
        }, 200);
    });
});

// For typing
const hoverAndPlaySound = function(e) {
    let dataKey = e.key.toUpperCase().charCodeAt(0);
    let correspondingDiv = document.querySelector(`div[data-key="${dataKey}"]`);
    let correspondingAudio = document.querySelector(`audio[data-key="${dataKey}"]`);
    
    correspondingDiv.classList.add("playing");
    correspondingAudio.play();

    setTimeout(() => {
        correspondingDiv.classList.remove("playing");
    }, 200);

}
document.addEventListener("keypress", e => hoverAndPlaySound(e));



