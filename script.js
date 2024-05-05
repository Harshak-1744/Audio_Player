document.addEventListener('DOMContentLoaded', function() {
    let audio = new Audio('http://localhost:5500/Audios/Pushpaa.mp3');
    let volumeControl = document.getElementById('volume');
    let muteButton = document.getElementById('mute');
    let progressBar = document.getElementById("progressBar");

    document.getElementById("play").addEventListener("click", function() {
        audio.play();
    });

    document.getElementById("pause").addEventListener("click", function() {
        audio.pause();
    });

    document.querySelector("#reset").addEventListener("click",function() {
        audio.currentTime = 0;
        updateProgressBar();
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = this.value;
    });

    muteButton.addEventListener('click', function() {
        audio.muted = !audio.muted;
        this.textContent = audio.muted ? 'Unmute' : 'Mute';
    });


    audio.addEventListener("timeupdate", function() {
        updateProgressBar();
    });

    function updateProgressBar() {
        if (audio.duration) {
            var percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percentage + '%';
        }
    }
});
