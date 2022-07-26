import {draw_player} from "./Player.js"
import {check_player} from "./Player.js"
import {draw_obstical} from "./Obstical.js"
import {CheckObstical} from "./Obstical.js"
import {CheckKeyboard} from "./Keyboard.js"
import {Setup_Keyboard} from "./Keyboard.js"
let bird = {
    x:20,
    y:20,
    vx:0,
    vy:0.005,
    ax:0,
    ay:0.02,
    alive:true,
    jump_ready: false,
    keystate:{
        'space':false,
    }
}
let obstical = {
    x:500,
    y:0
}
let PlayerScore = 0
let ctx
let scroll = true
function Generate_Randome_Num() {
    obstical.y = (Math.floor(Math.random() * 480))
}
function update_physics() {
    bird.vy = bird.vy + bird.ay
    bird.y = bird.y + bird.vy
}
function draw_background() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,500,500)
}

function scrollX() {
    if (scroll === true) {
        obstical.x = obstical.x-1
        if(bird.x == obstical.x) {
            console.log("success")
            PlayerScore += 1
        }
    }
}
function draw_overlay() {
    if (bird.alive === false) {
        ctx.fillStyle = 'red'
        ctx.font = '24pt sans-serif'
        ctx.fillText("You Died", 200,50)
        ctx.fillText("Click To Restart", 150,100)
        scroll = false
        obstical.x = 400
        bird.vx = 0
        bird.vy = 0
    }
}
const $ = (sel) => document.querySelector(sel)
function score() {
    $("#Score").innerText = "Score:"+ PlayerScore
}
function CheckTopWall(){
    if (bird.y <= 0) {
        bird.vy = 1
    }
}
function drawframe() {
    scrollX()
    CheckKeyboard(ctx,bird)
    update_physics()
    draw_background()
    draw_player(ctx, bird)
    check_player(ctx, bird)
    draw_obstical(ctx, obstical)
    draw_overlay()
    CheckObstical(ctx, obstical, bird)
    CheckTopWall()
    score()
    window.requestAnimationFrame(drawframe)
}
function StartGame() {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    Generate_Randome_Num()
    drawframe()
    Setup_Keyboard(ctx,bird)
}
StartGame()

