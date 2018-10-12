let buttonList = document.getElementsByClassName('button');
let userPattern = [];
let gamePattern = [];

var keepPlaying = true;

var randomNumber;
var counterRound = 1;
var initScore;
var numberOfBlocks;
var timeOutBlocks;
var timeOutRound = 3000;

function instatiateThisRound() {
     counterRound++;
     numberOfBlocks = 3;
     timeOutBlocks = 1000 - 2 * counterRound;
     //timeOutRound = 3000;
     gamePattern = [];
     userPattern = [];
}

function getRandomPattern(numberOfBlocks) {
     for (let i = 0; i < numberOfBlocks; i++) {
          randomNumber = Math.floor((Math.random() * 9) + 1);
          gamePattern.push(randomNumber);
     }
}

function getUserPattern() {
     let i = 0;
     setTimeout(function () {
          if (i === numberOfBlocks) {
               return false;
          }

          Array.from(buttonList).forEach(function (element) {
               element.addEventListener('click', function (e) {
                    console.log(e.target.innerHTML + " was clicked");
                    if (e.target.innerHTML == gamePattern[i]) {
                         userPattern.push(e.target.innerHTML);
                         i++;
                    }
                    else {
                         userFailed();
                    }
               });
          });
     }, timeOutBlocks * 2);
}


function colorBlocks() {
     let counter = 0;
     setInterval(function () {
          if (counter === numberOfBlocks) {
               return false;
          }

          buttonList[gamePattern[counter]].style.backgroundColor = 'rgb(230, 35, 35)';//red
          setTimeout(function () {
               buttonList[gamePattern[counter]].style.backgroundColor = 'rgba(255, 251, 43, 0.63)';  //yellow
               counter++;
          }, timeOutBlocks);
     }, timeOutBlocks * 2);
}

function startGame() {
     instatiateThisRound();

     while (keepPlaying === true) {
          getRandomPattern(numberOfBlocks);
          colorBlocks();
          getUserPattern(); //get user's pattern & validate ... i know single responsability....

          instatiateThisRound();
     }
}

function pauseGame() {

}

function userFailed() {
     keepPlaying = false;
     alert("You've lost!");
     updateHighScore();
}

function updateHighScore() {
     var highScore = localStorage.getItem('highScore');

     if (counterRound > highScore) {
          highScore = parseInt(counterRound);
          localStorage.setItem('highScore', highScore);
     }
}

(function initializeGame() {
     var startButton = document.getElementById('start');
     startButton.addEventListener("click", startGame);

     initScore = document.getElementById('round');
     initScore.innerHTML = 1;

     //set highScore
     localStorage.setItem("highScore", 0);
     highScore = document.getElementById('highScore');
     highScore.innerHTML = localStorage.getItem('highScore');

})();
