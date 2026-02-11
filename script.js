"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;
let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", function () {
  if (!play) return;
  noCount++;
  const imageIndex = Math.min(noCount, MAX_IMAGES);
  changeImage(imageIndex);
  resizeYesButton();
  updateNoButtonText();
  if (noCount === MAX_IMAGES) play = false;
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");

  catImg.classList.add("bounce");
  titleElement.classList.add("pop");

  catImg.addEventListener("animationend", () => catImg.classList.remove("bounce"));
  titleElement.addEventListener("animationend", () => titleElement.classList.remove("pop"));

  createHeartParticles(40); // explosion
}

function createHeartParticles(count) {
  const colors = ["#f53699", "#ff4d6d", "#ffffff"];
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const catRect = catImg.getBoundingClientRect();
    particle.style.left = `${catRect.left + Math.random() * catRect.width}px`;
    particle.style.top = `${catRect.top + Math.random() * catRect.height}px`;

    particle.style.setProperty("--randX", Math.random());
    const size = 0.8 + Math.random() * 1.2;
    particle.style.transform = `rotate(${Math.random() * 360}deg) scale(${size})`;
    const duration = 1 + Math.random() * 1.5;
    particle.style.animation = `float ${duration}s linear forwards`;

    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  yesButton.style.fontSize = `${fontSize * 1.6}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No", "Are you sure?", "Pookie please", "Don't do this to me :(",
    "You're breaking my heart", "I'm gonna cry..."
  ];
  return messages[Math.min(noCount, messages.length - 1)];
}

function changeImage(image) {
  catImg.style.opacity = 0;
  catImg.style.transform = "scale(0.95)";
  setTimeout(() => {
    catImg.src = `img/cat-${image}.jpg`;
    catImg.style.opacity = 1;
    catImg.style.transform = "scale(1)";
  }, 200);
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

// background floating hearts
const bgContainer = document.createElement("div");
bgContainer.classList.add("background-hearts");
document.body.appendChild(bgContainer);

function createBackgroundHearts(count = 50) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.classList.add("bg-heart");

    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.setProperty("--size", (0.5 + Math.random() * 1.5).toFixed(2));
    const duration = (5 + Math.random() * 5).toFixed(2);
    heart.style.animation = `floatBg ${duration}s linear forwards`;
    heart.style.animationDelay = `${Math.random() * 5}s`;

    bgContainer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

setInterval(() => createBackgroundHearts(5), 1000);