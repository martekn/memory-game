import { clickCard } from "./index.js";
import { images } from "./data.js";

export const createElements = function (tag, className, content, imageDetails) {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (content) {
    element.innerText = content;
  }

  if (imageDetails) {
    element.setAttribute("src", imageDetails.url);
    element.setAttribute("alt", imageDetails.alt);
  }

  return element;
};

export const appendChildren = function (array, parent) {
  for (const item of array) {
    parent.appendChild(item);
  }
};

const createCardHtml = function (imageDetails) {
  const card = createElements("div", "card");
  card.setAttribute("data-id", imageDetails.id);
  card.addEventListener("click", clickCard);
  const innerCard = createElements("div", "card-inner");
  const cardFront = createElements("div", "card-front");
  const cardBack = createElements("div", "card-back");
  const image = createElements("img", null, null, imageDetails);

  appendChildren([innerCard], card);
  appendChildren([cardFront, cardBack], innerCard);
  appendChildren([image], cardBack);

  return card;
};

const createCardArray = function (imageArray, gridColumn, gridRow) {
  const cellCount = gridColumn + gridRow;
  let cards = [];
  for (let i = 0; i < cellCount; i++) {
    const image = imageArray[i];
    cards.push(createCardHtml(image));
    cards.push(createCardHtml(image));
  }
  cards = cards.sort(() => Math.random() - 0.5);
  return cards;
};
export const populateGrid = function (imageArray) {
  const cards = createCardArray(imageArray, 4, 4);
  const cardContainer = createElements("div", "game-cards");
  for (const card of cards) {
    appendChildren([card], cardContainer);
  }
  return cardContainer;
};

export const createGamesContent = function (parent) {
  const cardContainer = populateGrid(images, 4, 4);
  const playPause = createElements("button", "play-pause");
  const playPauseIcon = createElements("span", "material-symbols-outlined", " pause ");
  const timerContent = createElements("div", "timer");
  const minutesTens = createElements("span", "minutes-tens");
  const minutesOnes = createElements("span", "minutes-ones");
  const colon = createElements("span", "colon", ":");
  const secondsTens = createElements("span", "seconds-tens");
  const secondsOnes = createElements("span", "seconds-ones");
  const gameContainer = createElements("div", "game-container");
  appendChildren([playPauseIcon], playPause);
  appendChildren([timerContent, cardContainer, playPause], gameContainer);
  appendChildren([minutesTens, minutesOnes, colon, secondsTens, secondsOnes], timerContent);
  appendChildren([gameContainer], parent);
};
