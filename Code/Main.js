import { draw_obstacle as draw_obstacle } from "./Obstacle.js";
import { CheckObstacle as CheckObstacle } from "./Obstacle.js";
import { CheckKeyboard } from "./Keyboard.js";
import { Setup_Keyboard } from "./Keyboard.js";
import { CheckTopWall } from "./Wall.js";
import { Generate_Random_Num } from "./Random-Num-Gen.js";
import { draw_background } from "./Wall.js";
import { CheckBottomWall } from "./Wall.js";
let speed = 1;
let level = 1;
let PoleMoved = 1;
let BackgroundY = 0;
let BackgroundX = 0;
let colors = {
  red: false,
  blue: false,
}
let Flap = new Audio("./Sound/jump.wav");
let Coin = new Audio("./Sound/Coin.wav");
let BirdDie = new Audio("./Sound/hit.wav");
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
let RedBird = new Image();
let Direction = true;
RedBird.src = "./Grafics/RedBird.png";
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
function birdColor() {
  let colorPicker = Math.floor(Math.random() * (3 - 1)) + 1;
  if (colorPicker === 1) {
    colors.red = true
  }
  if (colorPicker === 2) {
    colors.blue = true
  }

}
birdColor();
function int() {
  let integer = Math.floor(Math.random() * (3 - 1)) + 1;
  if (integer === 1) {
    Direction = true;
  }
  if (integer === 2) {
    Direction = false;
  }
}

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
  x: 800,
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
function MoveFloor() {
  move = move - 2.5;
  ctx.drawImage(base, 11 + move, 450);
  ctx.drawImage(base_long, +move + 465, 450);
  ctx.drawImage(base_long, +move + 800, 450);
  ctx.drawImage(base_long, +move + 200, 450);




  if (move <= -300) {
    move = move + 50;
  }
  if (bird.alive === false) {
    move = move + 2.5;
  }
}
function draw_player(ctx, bird, img) {
  ctx.fillStyle = "#fce056";
  ctx.imageSmoothingEnabled = false;
  if (colors.red === true) {
    ctx.drawImage(RedBird, bird.x, bird.y, 17 * 2, 12 * 2);

  }
  if (colors.blue === true) {
    ctx.drawImage(img, bird.x, bird.y, 17 * 2, 12 * 2);

  }
}
function scrollX(Coin, base) {
  if (scroll === true) {
    obstacle.x = obstacle.x - 3;

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
function update_physics(ctx, bird) {
  bird.vy = bird.vy + bird.ay;
  bird.y = bird.y + bird.vy;
}

function MoveObstacle(obstacle) {
  if (Direction === true) {
    obstacle.y = obstacle.y + 0.5;
  }
  if (Direction === false) {
    obstacle.y = obstacle.y - 0.5;
  }
  console.log("Y is " + obstacle.y)
  if (obstacle.y === 30) {
    Direction = true
  }
  if (obstacle.y === 350) {
    Direction = false
  }
}
function Die() {
  if (bird.alive === false) {
    ctx.font = "24pt sans-serif";
    ctx.drawImage(GameOver, 300, 0);
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
  CheckObstacle(ctx, obstacle, bird, int, PoleMoved);
  CheckTopWall(ctx, bird, obstacle);
  CheckBottomWall(ctx, bird);
  MoveFloor();
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
