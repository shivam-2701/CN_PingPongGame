'use strict';

// Global variable for the game Logic
let bar1 = document.getElementById('rod-one');
let bar2 = document.getElementById('rod-two');
let ball = document.querySelector(".ball");
let xDir = -1;
let yDir = -1;
let xSpd = 4;
let ySpd = 5;


let initialPos={
   left:(window.innerWidth / 2),
   right:ball.getBoundingClientRect().right,
   top:innerHeight - bar2.offsetHeight - ball.offsetHeight,
   bottom:ball.getBoundingClientRect().bottom
}
let score1 = 0, score2 = 0, maxScore1 = 0, maxScore2 = 0;

// Variable to store the intervalId of the game engine
let gameId = null;
function setSpeed() {
    xSpd = Math.floor(Math.random() * 4) + 3;
    ySpd = Math.floor(Math.random() * 4) + 3;
}


function resetGamePos() {
    setSpeed();
    bar1.style.left = (window.innerWidth / 2 - bar1.offsetWidth / 2) + "px";
    bar2.style.left = (window.innerWidth / 2 - bar1.offsetWidth / 2) + "px";
    bar2.style.top = window.innerHeight - bar2.offsetHeight + "px";
    ball.style.top= initialPos.top +"px";
    ball.style.left = initialPos.left + "px";
    console.log("Game Pos reset");
    if (gameId != null) {
        clearInterval(gameId);
    }
}
function initializeGame() {
    console.log(initialPos,ball.getBoundingClientRect());
    resetGamePos();
    addEventListenerToRods();
    score1 = 0, score2 = 0, maxScore1 = 0, maxScore2 = 0;
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
    if (ballPos.top > 0) {
        //Collided with bottom
        if (hitBar(ball, bar2)) {
            yDir = (yDir == -1 ? 1 : -1);

        } else {
            score1++;
            maxScore1 = Math.max(maxScore1, score1);
            console.log("score1 " + score1, maxScore1);
            clearInterval(gameId);
            gameId = null;
            resetGamePos();
            window.alert("Player 1 Lost!! \n Press Enter to continue");

        }
    } else {

        //Collided with the top of the screen
        if (hitBar(ball, bar1)) {
            yDir = (yDir == -1 ? 1 : -1);

        } else {
            score2++;
            maxScore1 = Math.max(maxScore2, score2);
            clearInterval(gameId);
            resetGamePos();
            console.log("score2 " + score2, maxScore2);
            window.alert("Player 2 Lost!! \n Press Enter to continue");
        }
    }
}
function addEventListenerToRods() {
    window.addEventListener("keydown", function (event) {
        console.log("key Pressed", event.key);
        bar2 = bar2;
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


window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        clearInterval(gameId);
        gameId = null;
    } else if (e.key === 'Enter') {
        if (gameId !== null) {
            clearInterval(gameId);
        }
        resetGamePos();
        // gameId = startGame();
    }
});
alert("Press Enter to startGame");

initializeGame();
gameId = startGame();
