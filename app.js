let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;

let level = 0;

let gameText = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started === false) {
    started = true;
    levelup();
  }
});

const gameFlash = function (btn) {
  if (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 300);
  } else {
    console.error("gameFlash received null button");
  }
};

const userFlash = function (btn) {
  if (btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
      btn.classList.remove("userFlash");
    }, 300);
  } else {
    console.error("userFlash received undefined button");
  }
};

const levelup = function () {
  userSeq = [];
  level++;
  gameText.innerText = `Level : ${level}`;
  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  gameFlash(ranBtn);
};

const checkans = function (idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    gameText.innerHTML = `<h2>Game over your score was : <b>${level}</b> <br> press any key start</h2>`;
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "brown";
    }, 150);
    resetGame();
  }
};

const btnPress = function () {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkans(userSeq.length - 1);
};

let allBtn = document.querySelectorAll(".btn");

for (let btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

const resetGame = function () {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
};