import { Paddle } from './Object/Paddle.js';
import { Ball } from './Object/Ball.js';

let url = `ws://localhost:8001/ws/socket-game/`;
const socket = new WebSocket(url);

const canvas = document.getElementById("gameCanvas");
const score = document.getElementById("score");
const ctx = canvas.getContext("2d");

ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, -1);

const paddleWidth = 10;
const paddleHeight = 100;

const ball = new Ball(0, 0);
const paddle1 = new Paddle(-canvas.width / 2 + paddleWidth / 2, 0, paddleWidth, paddleHeight);
const paddle2 = new Paddle(canvas.width / 2 - paddleWidth / 2, 0, paddleWidth, paddleHeight);

const keysPressed = {};

function updateScore(player1Score, player2Score) {
    score.innerText = `${player1Score} - ${player2Score}`;
}

function drawGame() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    ball.setColor("white");
    paddle1.setColor("white");
    paddle2.setColor("white");

    ball.draw(ctx);
    paddle1.draw(ctx);
    paddle2.draw(ctx);
}

socket.onopen = () => {
    console.log("Conectado al WebSocket");

    socket.send(JSON.stringify({
        canvasHeight: canvas.height,
        canvasWidth: canvas.width,
        posPaddle1: paddle1.getPositionPaddle(),
        posPaddle2: paddle2.getPositionPaddle(),
        paddleWidth: paddleWidth,
        paddleHeight: paddleHeight,
        ballX: ball.x,
        ballY: ball.y,
    }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.paddle1Y !== undefined) {
        paddle1.update(data.paddle1Y);
    }
    if (data.paddle2Y !== undefined) {
        paddle2.update(data.paddle2Y);
    }

    if (data.ballX !== undefined && data.ballY !== undefined) {
        ball.update(data.ballX, data.ballY);
    }

    if (data.player1Score !== undefined && data.player2Score !== undefined) {
        updateScore(data.player1Score, data.player2Score);
    }

    if (data.message) {
        const messageDiv = document.getElementById("message");
        messageDiv.innerText = data.message;
    }

    drawGame();
};

socket.onerror = () => {
    console.log("WebSocket cerrado");
};

document.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    delete keysPressed[event.key];
});

function sendKeyStates() {
    const activeKeys = Object.keys(keysPressed);
    if (activeKeys.length > 0) {
        socket.send(JSON.stringify({ keys: activeKeys }));
    }
    requestAnimationFrame(sendKeyStates);
}

drawGame();
sendKeyStates();
