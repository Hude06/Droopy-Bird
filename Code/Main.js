import { draw_player } from "./Player.js";
import { check_player } from "./Player.js";
import { draw_obstacle as draw_obstacle } from "./Obstacle.js";
import { CheckObstacle as CheckObstacle } from "./Obstacle.js";
import { CheckKeyboard } from "./Keyboard.js";
import { Setup_Keyboard } from "./Keyboard.js";
import { CheckTopWall } from "./Wall.js";
import { update_physics } from "./Physics.js";
import { Generate_Random_Num } from "./Random-Num-Gen.js";
import { draw_background } from "./Wall.js";
let bird = {
  x: 20,
  y: 20,
  vx: 0,
  vy: 0.005,
  ax: 0,
  ay: 0.02,
  alive: true,
  jump_ready: false,
  keystate: {
    space: false,
  },
};
let obstacle = {
  x: 500,
  y: 0,
};
let PlayerScore = 0;
let ctx;
let scroll = true;
function scrollX() {
  if (scroll === true) {
    obstacle.x = obstacle.x - 1;
    if (bird.x == obstacle.x) {
      console.log("success");
      PlayerScore += 1;
    }
  }
}
function Die() {
  if (bird.alive === false) {
    ctx.fillStyle = "red";
    ctx.font = "24pt sans-serif";
    ctx.fillText("You Died", 200, 50);
    ctx.fillText("Click To Restart", 150, 100);
    scroll = false;
    obstacle.x = 400;
    bird.vx = 0;
    bird.vy = 0;
    bird.y = 250;
    PlayerScore = 0;
  }
}
const $ = (sel) => document.querySelector(sel);
function score() {
  $("#Score").innerText = "Score:" + PlayerScore;
}

function drawframe() {
  scrollX();
  CheckKeyboard(ctx, bird, obstacle);
  update_physics(ctx, bird, obstacle);
  draw_background(ctx, bird, obstacle);
  draw_player(ctx, bird, obstacle);
  check_player(ctx, bird, obstacle);
  draw_obstacle(ctx, obstacle);
  Die(ctx, bird, obstacle);
  CheckObstacle(ctx, obstacle, bird);
  CheckTopWall(ctx, bird, obstacle);
  score();
  window.requestAnimationFrame(drawframe);
}
function StartGame() {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  Generate_Random_Num(ctx, bird, obstacle);
  drawframe();
  Setup_Keyboard(ctx, bird);
}
StartGame();
