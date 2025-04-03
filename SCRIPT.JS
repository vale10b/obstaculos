document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const gameContainer = document.getElementById("gameContainer");

    let playerX = 280; 
    let playerY = 360; 
    let isJumping = false;
    let gravity = 3;
    let obstacles = [];

    function movePlayer(dx, dy) {
        playerX = Math.max(0, Math.min(560, playerX + dx));
        playerY = Math.max(0, Math.min(360, playerY + dy));
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }

    function jump() {
        if (isJumping) return;

        isJumping = true;
        let upInterval = setInterval(() => {
            if (playerY <= 260) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (playerY >= 360) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    playerY += gravity;
                    player.style.top = playerY + "px";
                }, 20);
            }
            playerY -= gravity;
            player.style.top = playerY + "px";
        }, 20);
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            jump();
        } else if (event.code === "ArrowLeft") {
            movePlayer(-20, 0);
        } else if (event.code === "ArrowRight") {
            movePlayer(20, 0);
        } else if (event.code === "ArrowUp") {
            movePlayer(0, -20);
        } else if (event.code === "ArrowDown") {
            movePlayer(0, 20);
        }
    });

    function createObstacle() {
        let obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");

        let startX = Math.random() * 560;
        let startY = Math.random() * 360;
        obstacle.style.left = startX + "px";
        obstacle.style.top = startY + "px";
        gameContainer.appendChild(obstacle);
        obstacles.push(obstacle);

        let speedX = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? -1 : 1);
        let speedY = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? -1 : 1);

        function moveObstacle() {
            let obstacleX = parseInt(obstacle.style.left) || 0;
            let obstacleY = parseInt(obstacle.style.top) || 0;

            obstacleX += speedX;
            obstacleY += speedY;

            if (obstacleX >= 560 || obstacleX <= 0) speedX *= -1;
            if (obstacleY >= 360 || obstacleY <= 0) speedY *= -1;

            obstacle.style.left = obstacleX + "px";
            obstacle.style.top = obstacleY + "px";

            checkCollision(obstacle);
        }

        setInterval(moveObstacle, 20);
    }

    function checkCollision(obstacle) {
        let playerRect = player.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            alert("¡Has perdido! Recarga la página para intentarlo de nuevo.");
            location.reload();
        }
    }

    // Crear más obstáculos desde el inicio
    for (let i = 0; i < 7; i++) {
        createObstacle();
    }

    // Generar obstáculos cada 1 segundo
    setInterval(createObstacle, 1000);
});
