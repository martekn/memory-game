import { createElements, appendChildren, createGamesContent } from "./createHtml.js";

const main = document.querySelector("main");
const startButton = document.querySelector(".start");
let flippedCards = [];

export const clickCard = function () {
  flippedCards.push(this);
  if (flippedCards.length <= 2) {
    this.classList.add("clicked");
  }
  flippedCards = flippedCards.filter((card) => card.classList.contains("clicked"));

  if (flippedCards.length === 2) {
    const cardOne = flippedCards[0];
    const cardTwo = flippedCards[1];
    if (cardOne.dataset.id === cardTwo.dataset.id) {
      setTimeout(() => {
        cardOne.classList.add("completed");
        cardTwo.classList.add("completed");
      }, 500);
    }
    setTimeout(() => {
      cardOne.classList.remove("clicked");
      cardTwo.classList.remove("clicked");
    }, 1000);

    flippedCards = [];
  }
  setTimeout(() => {
    const completedCards = document.querySelectorAll(".completed");
    if (completedCards.length === 16) {
      const gameContainer = document.querySelector(".game-container");
      gameContainer.innerHTML = "";
      gameCompleted();
    }
  }, 4000);
};

let interval;
let timerRunning = true;
export const timer = function () {
  let elapsedSeconds = 0;
  const minContainerOnes = document.querySelector(".minutes-ones");
  const minContainerTens = document.querySelector(".minutes-tens");
  const secContainerOnes = document.querySelector(".seconds-ones");
  const secContainerTens = document.querySelector(".seconds-tens");

  interval = setInterval(() => {
    if (!timerRunning) {
      return;
    }

    elapsedSeconds++;
    let minutes = Math.floor(elapsedSeconds / 60);
    let seconds = elapsedSeconds % 60;

    if (minutes === 100) {
      stopStartTimer();
      return;
    }
    const prependedMinutes = String(minutes).padStart(2, "0");
    const prependedSeconds = String(seconds).padStart(2, "0");

    const minutesArray = prependedMinutes.split("");
    const secondsArray = prependedSeconds.split("");
    minContainerTens.innerText = minutesArray[0];
    minContainerOnes.innerText = minutesArray[1];
    secContainerTens.innerText = secondsArray[0];
    secContainerOnes.innerText = secondsArray[1];
  }, 1000);
};

export const stopStartTimer = function () {
  this.classList.toggle("paused");
  timerRunning = !timerRunning;
  if (!timerRunning) {
    this.children[0].innerText = "play_arrow";
  } else {
    this.children[0].innerText = "pause";
  }
};

const startGame = function () {
  main.innerHTML = "";
  createGamesContent(main);
  const playPause = document.querySelector(".play-pause");
  playPause.addEventListener("click", stopStartTimer);
  timer();
};

const gameCompleted = function () {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const bubble = createElements("div", "bubble");
  const title = createElements("h1", null, "Congratulations!");
  const text = createElements("p", null, "You found all the pairs and completed the game!");
  const button = createElements("button", ".start", "play again");
  button.addEventListener("click", startGame);
  appendChildren([title, text, button], bubble);
  appendChildren([bubble], main);
};
startButton.addEventListener("click", startGame);
