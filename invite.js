// 1. Automatic Audio Playback on Page Load (When redirected from cover page button)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('playMusic') === 'true') {
        playAudio();
    }
});

// 2. Play Audio on First User Interaction Anywhere on the Screen
document.addEventListener('click', function startAudioOnFirstClick() {
    const audio = document.getElementById("bgMusic");
    if (audio && audio.paused) {
        playAudio();
    }
    document.removeEventListener('click', startAudioOnFirstClick);
}, { once: true });

// Helper Function to Safely Play Audio & Update Button State
function playAudio() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");
    
    if (audio) {
        audio.play().then(() => {
            if (btn) btn.textContent = "⏸️";
        }).catch(err => {
            console.log("Autoplay waiting for user interaction:", err);
        });
    }
}

// 3. Music Toggle Button Handler
function toggleMusic() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");

    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            if (btn) btn.textContent = "⏸️";
        }).catch(error => {
            alert("Please verify the audio file name/path in your HTML code.");
        });
    } else {
        audio.pause();
        if (btn) btn.textContent = "🎵";
    }
}

// 4. Creative Floating Hearts & Wishes Effect
let loveCount = 0;

function sendLove(event) {
    // Update counter
    loveCount++;
    const counterElement = document.getElementById("loveCount");
    if (counterElement) {
        counterElement.textContent = loveCount;
    }

    // Spawn animated floating icons
    const heartIcons = ["💖", "✨", "🌸", "♥", "💕", "🤍", "♡"];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

        // Spread around the click coordinates
        const xPos = event.clientX + (Math.random() * 80 - 40);
        const yPos = event.clientY - 20;

        heart.style.left = `${xPos}px`;
        heart.style.top = `${yPos}px`;

        document.body.appendChild(heart);

        // Remove element after animation ends
        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
}