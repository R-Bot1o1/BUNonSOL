const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const bun = document.getElementById('bun');
const scoreDisplay = document.getElementById('score');
const missImages = document.querySelectorAll('.miss');
const message = document.getElementById('message');
const popup = document.getElementById('popup');
const backgroundMusic = document.getElementById('backgroundMusic');
const catchSound = document.getElementById('catchSound');

const bunImages = [
    'BIG_BUN2.png',
    'bun_cool_transparent.png',
    'pink.png'
];

let basketX = gameArea.clientWidth / 2 - basket.clientWidth / 2;
let bunY = 0;
let bunX = Math.random() * (gameArea.clientWidth - bun.clientWidth);
let score = 0;
let misses = 0;

document.addEventListener('mousemove', (e) => {
    basketX = e.clientX - basket.clientWidth / 2;
    basket.style.left = `${basketX}px`;
});

function dropBun() {
    bunY += 5;
    if (bunY > gameArea.clientHeight - basket.clientHeight - bun.clientHeight) {
        if (bunX > basketX && bunX < basketX + basket.clientWidth) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            catchSound.play();
            if (score % 5 === 0) {
                scoreDisplay.classList.add('score-animate');
                setTimeout(() => {
                    scoreDisplay.classList.remove('score-animate');
                }, 500);
            }
            if (score % 10 === 0) {
                showMessage();
                showPopup();
            }
            resetBun();
        } else if (bunY > gameArea.clientHeight - bun.clientHeight) {
            misses++;
            if (misses <= 10) {
                missImages[misses - 1].src = 'green.png';
            }
            if (misses >= 10) {
                score = 0;
                misses = 0;
                scoreDisplay.textContent = `Score: ${score}`;
                missImages.forEach(img => img.src = 'BIG_BUN2.png');
            }
            resetBun();
        }
    }
    bun.style.top = `${bunY}px`;
    bun.style.left = `${bunX}px`;
    requestAnimationFrame(dropBun);
}

function resetBun() {
    bunY = 0;
    bunX = Math.random() * (gameArea.clientWidth - bun.clientWidth);
    bun.src = bunImages[Math.floor(Math.random() * bunImages.length)];
}

function showMessage() {
    message.classList.remove('hidden');
    message.classList.add('visible');
    setTimeout(() => {
        message.classList.remove('visible');
        message.classList.add('hidden');
    }, 2000);
}

function showPopup() {
    popup.classList.remove('hidden');
    popup.classList.add('visible');
    setTimeout(() => {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }, 2000);
}

// Start background music
backgroundMusic.play();

resetBun();
dropBun();