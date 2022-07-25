
let birdx = 20
let birdy = 20
let vx = 0
let vy = 0.005
let ax = 0
let ay = 0.02
let PlayerScore = 0
let obsticalx = 500
let obsticaly = 0
let Die
let ctx
let scroll = true
let jump_ready = false
let keystate = {
    'space':false,
}
function Generate_Randome_Num() {
    obsticaly = (Math.floor(Math.random() * 480))
}
function update_physics() {
    vy = vy + ay
    birdy = birdy + vy
}
function draw_background() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,500,500)
}
function draw_player() {
    ctx.fillStyle = '#fce056';
    ctx.fillRect(birdx, birdy, 25, 25);
}
function draw_obstical(){
    ctx.fillStyle = '#5696fc';
    ctx.fillRect(obsticalx,0,25,obsticaly)
    ctx.fillRect(obsticalx,obsticaly+100 , 25, 500)
}
function check_player() {
     if (birdy >= 475) {
        vy = 0
        ay = 0 
    }
}
function setup_keyboard() {
    window.addEventListener("keydown",(e) => {
        if(e.repeat) return
        if(e.code === 'Space') {
            keystate.space = true
            jump_ready = true
        }
    })
    document.addEventListener("keyup",(e) => {
        if(e.code === 'Space') {
            keystate.space = false
        }
    })
}
function CheckKeyboard() {
    if(jump_ready) {
        vy = vy - 2
        jump_ready = false
    }
}
function scrollX() {
    if (scroll === true) {
        obsticalx = obsticalx-1
    }
}
function CheckObstical(){ 
    // if x < -1, move column back to the right
    if (obsticalx <= -1) {
        obsticalx = 500
    }
    if (birdx >= obsticalx && birdx < obsticalx + 100){
        if (birdy < obsticaly) {
            Die = true                
        }
        if (birdy > obsticaly + 100) {
            Die = true
        }
    }
}
function draw_overlay() {
    if (Die === true) {
        ctx.fillStyle = 'red'
        ctx.font = '24pt sans-serif'
        ctx.fillText("You Died", 200,50)
        ctx.fillText("Click To Restart", 150,100)
        scroll = false
        obsticalx = 500
        vx = 0
        vy = 0
    }
}
function score() {
        const $ = (sel) => document.querySelector(sel)
        score.innerText = "Score:"+ PlayerScore
}
function CheckTopWall(){
    if (birdy <= 0) {
        vy = 1
        ay = 0 
    }
}
function drawframe() {
    score()
    scrollX()
    CheckKeyboard()
    update_physics()
    draw_background()
    draw_player()
    check_player()
    draw_obstical()
    draw_overlay()
    CheckObstical()
    CheckTopWall()
    window.requestAnimationFrame(drawframe)
}
function StartGame() {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    Generate_Randome_Num()
    drawframe()
    setup_keyboard()
}
StartGame()

