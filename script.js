'use strict';

// Global variable for the game Logic
let bar1 = document.getElementById('rod-one');
let bar2 = document.getElementById('rod-two');
let ball = document.querySelector(".ball");
let xDir = -1;
let yDir = -1;
let xSpd = 4;
let ySpd = 5;

const PLAYER_ONE_KEY = "play_one_max";
const PLAYER_TWO_KEY = "play_two_max";


let initialPos = {
    left: (window.innerWidth / 2),
    right: ball.getBoundingClientRect().right,
    top: innerHeight - bar2.offsetHeight - ball.offsetHeight,
    bottom: ball.getBoundingClientRect().bottom
}
let score1 = 0, score2 = 0, maxScore1 = 0, maxScore2 = 0;

// Getting max score from localStorage

if (localStorage.getItem(PLAYER_ONE_KEY) != undefined) {
    console.log("localStorage.getItem");
    maxScore1 = parseInt(localStorage.getItem(PLAYER_ONE_KEY));
    console.log("maxScore1: " + maxScore1);
}

if (localStorage.getItem(PLAYER_TWO_KEY) != undefined) {
    console.log("localStorage.getItem");
    maxScore2 = parseInt(localStorage.getItem(PLAYER_TWO_KEY));
    console.log("maxScore2: " + maxScore2);
}





// Variable to store the intervalId of the game engine
let gameId = null;
function setSpeed() {
    xSpd = Math.floor(Math.random() * 4) + 3;
    ySpd = Math.floor(Math.random() * 4) + 3;
}

function addEventListenerToRods() {
    window.addEventListener("keydown", function (event) {
        let key = event.key;
        if (key === 'd' || key === 'D') {
            let left_numeric = parseInt(
                bar1.style.left.substring(0, bar1.style.left.length - 2)
            );
            left_numeric += 20;
            if (left_numeric + bar1.offsetWidth > document.documentElement.clientWidth) {
                left_numeric = document.documentElement.clientWidth - bar1.offsetWidth;
            }
            bar1.style.left = left_numeric.toString() + "px";
            bar2.style.left = left_numeric.toString() + "px";
        } else if (key === 'a' || key === 'A') {
            let left_numeric = parseInt(
                bar1.style.left.substring(0, bar1.style.left.length - 2)
            );
            left_numeric -= 20;
            if (left_numeric < 0) {
                left_numeric = 0;
            }
            bar1.style.left = left_numeric.toString() + "px";
            bar2.style.left = left_numeric.toString() + "px";
        }
    });
}


function resetGamePos() {
    setSpeed();
    bar1.style.left = (window.innerWidth / 2 - bar1.offsetWidth / 2) + "px";
    bar2.style.left = (window.innerWidth / 2 - bar1.offsetWidth / 2) + "px";
    bar2.style.top = window.innerHeight - bar2.offsetHeight + "px";
    ball.style.top = initialPos.top + "px";
    ball.style.left = initialPos.left + "px";
    console.log("Game Pos reset");
    if (gameId != null) {
        clearInterval(gameId);
    }
}
function initializeGame() {
    console.log(initialPos, ball.getBoundingClientRect());
    resetGamePos();
}
function startGame() {
    gameId = setInterval(() => {
        let ballPos = ball.getBoundingClientRect();
        if (ball.offsetLeft <= 0 || ball.offsetLeft > window.innerWidth - ball.offsetWidth) {
            xDir = (xDir == -1 ? 1 : -1);
        } else if (ballPos.top <= bar1.getBoundingClientRect().bottom || ballPos.bottom > bar2.getBoundingClientRect().top) {
            checkTopCollision();
        }
        let currPos = {
            top: ball.offsetTop,
            left: ball.offsetLeft
        };

        ball.style.top = currPos.top + yDir * ySpd + 'px';
        ball.style.left = currPos.left + xDir * xSpd + 'px';
    }, 10);
    return gameId;
}

//Function to check collision status
function hitBar(ball, bar) {
    let ballPos = ball.getBoundingClientRect();
    let barPos = bar.getBoundingClientRect();
    if ((ballPos.left >= barPos.left && ballPos.right <= barPos.right)
        || (ballPos.right >= barPos.left && ballPos.right <= barPos.right)
        || (ballPos.left >= barPos.left && ballPos.left <= barPos.right)) {
        return true;
    } else {
        return false;
    }

}

// Function to determine if the ball hit the top

function checkTopCollision() {
    let ballPos = ball.getBoundingClientRect();
    if (ballPos.top > bar1.getBoundingClientRect().bottom) {
        //Collided with bottom
        if (hitBar(ball, bar2)) {
            yDir = (yDir == -1 ? 1 : -1);
        } else {
            score1++;
            maxScore1 = Math.max(maxScore1, score1);
            localStorage.setItem(PLAYER_ONE_KEY, maxScore1.toString());
            clearInterval(gameId);
            gameId = null;
            resetGamePos();
            window.alert(`Player 1 Won ${score1} Max Score: ${maxScore1} \n Press Enter to continue`);
            startGame();
        }
    } else {

        //Collided with the top of the screen
        if (hitBar(ball, bar1)) {
            yDir = (yDir == -1 ? 1 : -1);

        } else {
            score2++;
            maxScore2 = Math.max(maxScore2, score2);
            clearInterval(gameId);
            gameId = null;
            resetGamePos();
            localStorage.setItem(PLAYER_TWO_KEY, maxScore2.toString());
            window.alert(`Player 2 Won ${score2} Max Score: ${maxScore2} \n Press Enter to continue`);
            startGame();
        }
    }
}




alert("Press Enter to startGame \n Press Escape to stop game");

initializeGame();
addEventListenerToRods();
gameId = startGame();
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        clearInterval(gameId);
        gameId = null;
    } else if (e.key === 'Enter') {
        if (gameId !== null) {
            clearInterval(gameId);
        }
        resetGamePos();
    }
});