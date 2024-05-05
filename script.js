document.addEventListener('DOMContentLoaded', function() {
    let audio = new Audio('http://localhost:5500/Audios/Pushpaa.mp3'); 
    let volumeControl = document.getElementById('volume');
    let muteButton = document.getElementById('mute');
    let playButton = document.getElementById("play");
    let pauseButton = document.getElementById("pause");
    let currentTimeDisplay = document.getElementById("currentTime");
    let totalDurationDisplay = document.getElementById("totalDuration");
    let progressBar = document.getElementById("progressBar");

   
    muteButton.src = audio.muted ? 'https://img.icons8.com/ios/100/1A1A1A/mute--v1.png' : 'https://img.icons8.com/ios/100/1A1A1A/medium-volume--v1.png';

    playButton.addEventListener("click", function() {
        audio.play();
        playButton.style.visibility = 'hidden';
        pauseButton.style.visibility = 'visible';
    });

    pauseButton.addEventListener("click", function() {
        audio.pause();
        playButton.style.visibility = 'visible';
        pauseButton.style.visibility = 'hidden';
    });

    document.getElementById("reset").addEventListener("click", function() {
        audio.currentTime = 0;
        updateProgressBar();
        updateTimeDisplay();
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = this.value;
        if (audio.volume > 0 && audio.muted) {
            audio.muted = false;
            muteButton.src = 'https://img.icons8.com/ios/100/1A1A1A/medium-volume--v1.png';
        }
    });

    muteButton.addEventListener('click', function() {
        audio.muted = !audio.muted;
        muteButton.src = audio.muted ? 'https://img.icons8.com/ios/100/1A1A1A/mute--v1.png' : 'https://img.icons8.com/ios/100/1A1A1A/medium-volume--v1.png';
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
