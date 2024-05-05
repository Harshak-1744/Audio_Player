document.addEventListener('DOMContentLoaded', function() {
    let audio = new Audio('http://localhost:5500/Audios/Pushpaa.mp3');
    let volumeControl = document.getElementById('volume');
    let muteButton = document.getElementById('mute');
    let currentTimeDisplay = document.getElementById("currentTime");
    let totalDurationDisplay = document.getElementById("totalDuration");
    let progressBar = document.getElementById("progressBar");

    document.getElementById("play").addEventListener("click", function() {
        audio.play();
    });

    document.getElementById("pause").addEventListener("click", function() {
        audio.pause();
    });

    document.getElementById("reset").addEventListener("click", function() {
        audio.currentTime = 0;
        updateProgressBar();
        updateTimeDisplay();
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
        updateTimeDisplay();
    });

    function updateProgressBar() {
        if (audio.duration) {
            let percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percentage + '%';
        }
    }

    function updateTimeDisplay() {
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        if (audio.duration) {
            totalDurationDisplay.textContent = formatTime(audio.duration);
        }
    }

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secondsInt = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secondsInt.toString().padStart(2, '0')}`;
    }
});
