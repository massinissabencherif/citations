const astronaut = document.getElementById('astronaut');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
let mouseX = 0, mouseY = 0;
let astronautX = 0, astronautY = 0;
let score = 0;
let timeLeft = 60;
let stars = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateAstronautPosition() {
    const dx = mouseX - astronautX;
    const dy = mouseY - astronautY;

    astronautX += dx * 0.1;
    astronautY += dy * 0.1;

    astronaut.style.left = `${astronautX}px`;
    astronaut.style.top = `${astronautY}px`;

    checkCollisions();
    requestAnimationFrame(updateAstronautPosition);
}

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = '⭐';
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(star);
    stars.push(star);
}

function checkCollisions() {
    const astronautRect = astronaut.getBoundingClientRect();
    stars.forEach((star, index) => {
        const starRect = star.getBoundingClientRect();
        if (
            astronautRect.left < starRect.right &&
            astronautRect.right > starRect.left &&
            astronautRect.top < starRect.bottom &&
            astronautRect.bottom > starRect.top
        ) {
            star.remove();
            stars.splice(index, 1);
            score++;
            scoreElement.textContent = `Score: ${score}`;
            createStar();
        }
    });
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
        endGame();
    } else {
        setTimeout(updateTimer, 1000);
    }
}

function endGame() {
    alert(`Game Over! Your score: ${score}`);
    location.reload();
}

function startGame() {
    for (let i = 0; i < 5; i++) {
        createStar();
    }
    updateAstronautPosition();
    updateTimer();
}

startGame();