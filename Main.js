
let birdx = 20
let birdy = 20
let vx = 0
let vy = 0.005
let ax = 0
let ay = 0.02
let ctx
let x = 400
let y = 0

const obsticals = [x, y,];
let obsticalx = obsticals[0];
let obsticaly = obsticals[1];

function Generate_Randome_Num() {
    obsticaly = (Math.floor(Math.random() * 200))

    console.log (obsticalx)
    console.log(obsticaly)
}
function update_physics() {
    //birdx = birdx + 1
    vy = vy + ay
    birdy = birdy + vy
}
function draw_background() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,400,400)
}
function draw_player() {
    ctx.fillStyle = 'green';
    ctx.fillRect(birdx, birdy, 25, 25);
}
function draw_obstical(){
    ctx.fillStyle = 'green';
    //ctx.fillRect(300, 200, 25, obsticaly);
    ctx.fillRect(x,0,25,obsticaly)
    ctx.fillRect(x,obsticaly+100 , 25, 500)
}

function check_player() {
     if (birdy >= 375) {
        //console.log("Not Living")
        vy = 0
        ay = 0 
    }
}
function Obsticals(){
    Math.random(300)
}

let keystate = {
    'space':false,
}

let jump_ready = false

function setup_keyboard() {
    window.addEventListener("keydown",(e) => {
        if(e.repeat) return
        if(e.code === 'Space') {
            keystate.space = true
            jump_ready = true
            console.log("space happened")
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
        //birdy = + 5
        vy = vy - 2
        jump_ready = false
    }
}
Generate_Randome_Num()
function scrollX() {
    x = x-0.5
}
function CheckObstical(){ 
    if (x <= -1) {
        x = 400
    }
    console.log(x)
    console.log(birdx)
    if (x <=birdx*2){
        console.log("Die")
    }
}
function drawframe() {
    CheckKeyboard()
    update_physics()
    draw_background()
    draw_player()
    check_player()
    draw_obstical()
    scrollX()
    CheckObstical()

    window.requestAnimationFrame(drawframe)
}

function StartGame() {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawframe()
}

setup_keyboard()
StartGame()
