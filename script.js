"use strict";

let score0 = document.getElementById("score--0");
let score1 = document.getElementById("score--1");
let current0 = document.getElementById("current--0");
let current1 = document.getElementById("current--1");
let dice = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

let currentScore, playing, activePlayer, sorces;

let init = function () {
  currentScore = 0;
  activePlayer = 0;
  sorces = [0, 0];
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  dice.classList.add("hidden");
};
init();
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    let diceNum = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove("hidden");
    dice.src = `dice-${diceNum}.png`;
    if (diceNum != 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    sorces[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      sorces[activePlayer];

    if (sorces[activePlayer] >= 30) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
