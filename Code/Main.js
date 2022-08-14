import { draw_player } from "./Player.js";
import { draw_obstacle as draw_obstacle } from "./Obstacle.js";
import { CheckObstacle as CheckObstacle } from "./Obstacle.js";
import { CheckKeyboard } from "./Keyboard.js";
import { Setup_Keyboard } from "./Keyboard.js";
import { CheckTopWall } from "./Wall.js";
import { update_physics } from "./Physics.js";
import { Generate_Random_Num } from "./Random-Num-Gen.js";
import { draw_background } from "./Wall.js";
import { CheckBottomWall } from "./Wall.js";
let BackgroundY = 0;
let BackgroundX = 0;
let Flap = new Audio("/Sound/jump.wav");
let Coin = new Audio("/Sound/Coin.wav");
let BirdDie = new Audio("/Sound/hit.wav");
let SoundPlay = false;
let bird_image = new Image();
let pipe_image = new Image();
let pipe_headless = new Image();
let GameOver = new Image();
let base = new Image();
let base_long = new Image();
let Menu = new Image();
let Background = new Image();
let BossImage = new Image();

let Direction = true;
bird_image.src = "./Grafics/bird2.png";
pipe_image.src = "./Grafics/pipe.png";
pipe_headless.src = "./Grafics/pip-headles.png";
GameOver.src = "./Grafics/gameover.png";
base.src = "./Grafics/base.png";
base_long.src = "./Grafics/base.png";
Menu.src = "./Grafics/Menu.png";
Background.src = "./Grafics/Background.png";
BossImage.src = "./Grafics/Bird2.png";

// Returns a random integer from 0 to 9:
function int() {
  let integer = Math.floor(Math.random() * (3 - 1)) + 1;
  console.log(integer);
  if (integer === 1) {
    Direction = true;
  }
  if (integer === 2) {
    Direction = false;
  }
}

console.log(Direction);
let bird = {
  x: 20,
  y: 20,
  vy: 0.4,
  ay: 0.1,
  alive: true,
  jump_ready: false,
  keystate: {
    space: false,
    enter: false,
  },
};
let Boss = {
  x: 20,
  y: 100,
};

let obstacle = {
  x: 500,
  y: 0,
};
let PlayerScore = 0;
let livePlayerScore = 0;
if (localStorage.getItem("Coin")) {
  PlayerScore = parseInt(localStorage.getItem("Coin"));
}

let ctx;
let scroll = true;
let move = 0;
function MoveImage() {
  move = move - 1.5;
  ctx.drawImage(base, 11 + move, 450);
  ctx.drawImage(base_long, +move + 300, 450);
  if (move <= -130) {
    move = move + 50;
  }
  if (bird.alive === false) {
    move = move + 1.5;
  }
}

Boss.x = Boss.x += 470;
Boss.y = Boss.y += 50;
function CheckBos() {
  if (Boss.Level === 10) {
    BossLevel();
  }
}

function BossLevel() {
  ctx.save();
  ctx.translate(Boss.x, Boss.y);
  ctx.scale(-1, 1);
  ctx.drawImage(BossImage, 0, 0, 17 * 15, 12 * 15);

  ctx.restore();
}
function scrollX(Coin, base) {
  if (scroll === true) {
    obstacle.x = obstacle.x - 3;
    console.log(BackgroundX);

    if (PlayerScore < livePlayerScore) {
      PlayerScore += 1;
    }
    if (bird.x == obstacle.x) {
      if (bird.alive === true) {
        livePlayerScore += 1;
        Coin.play();
      }
    }
    ctx.drawImage(Background, BackgroundX, BackgroundY);
  }
}

function MoveObstacle(obstacle) {
  if (Direction === true) {
    obstacle.y = obstacle.y + 0.5;
  }
  if (Direction === false) {
    obstacle.y = obstacle.y - 0.5;
  }
}
function Die() {
  if (bird.alive === false) {
    ctx.font = "24pt sans-serif";
    ctx.drawImage(GameOver, 150, 0);
    obstacle.x = obstacle.x + 3;
    if (Direction === true) {
      obstacle.y = obstacle.y - 0.5;
    }
    if (Direction === false) {
      obstacle.y = obstacle.y + 0.5;
    }
    bird.vy = 0;
    bird.ay = 0;
    if (SoundPlay === false) {
      BirdDie.play();
      SoundPlay = true;
    }
    if (SoundPlay === true) {
      return;
    }
  }
}

const $ = (sel) => document.querySelector(sel);
function score(hj) {
  $("#Score").innerText = "Score:" + hj;
}
function Record(sc) {
  $("#Record").innerText = "Record:" + sc;
}

function drawframe() {
  draw_background(ctx, bird, obstacle);
  scrollX(Coin, base);
  Record(PlayerScore);
  CheckKeyboard(ctx, bird, obstacle);
  update_physics(ctx, bird, obstacle);
  draw_player(ctx, bird, bird_image);
  draw_obstacle(ctx, obstacle, pipe_image, pipe_headless);
  Die(ctx, bird, obstacle);
  CheckObstacle(ctx, obstacle, bird, int);
  CheckTopWall(ctx, bird, obstacle);
  CheckBottomWall(ctx, bird);
  MoveImage();
  MoveObstacle(obstacle);
  localStorage.setItem("Coin", PlayerScore);
  score(livePlayerScore);

  window.requestAnimationFrame(drawframe);
}
function StartGame() {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  Generate_Random_Num(ctx, bird, obstacle);
  drawframe();
  Setup_Keyboard(ctx, bird, Flap);
}
StartGame();
