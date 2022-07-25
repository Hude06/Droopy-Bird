
let birdx = 20
let birdy = 20
let vx = 0
let vy = 0.005
let ax = 0
let ay = 0.02
let ctx
let x = 500
let y = 0
let Die
let scroll = true
let PlayerScore = 0
const obsticals = [x, y];
let obsticalx = obsticals[0];
let obsticaly = obsticals[1];

function Generate_Randome_Num() {
    obsticaly = (Math.floor(Math.random() * 200))


}
function update_physics() {
    //birdx = birdx + 1
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
    //ctx.fillRect(300, 200, 25, obsticaly);
    ctx.fillRect(x,0,25,obsticaly)
    ctx.fillRect(x,obsticaly+100 , 25, 500)
}

function check_player() {
     if (birdy >= 475) {
        //console.log("Not Living")
        vy = 0
        ay = 0 
    }
}
function Obsticals(){
    Math.random(470)
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
    if (scroll === true) {
        x = x-1
 
    }
}
function CheckObstical(){ 
    // if x < -1, move column back to the right
    if (x <= -1) {
        x = 500
    }
    // console.log("birdx",birdx, x)
    // console.log("birdy",birdy,y)
    if (birdx >= x && birdx < x + 100){
        // console.log("maybe dead")
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
        x = x = 400
        vx = 0
        vy = 0


    }
    
}

let clock = 0
function drawframe() {
    clock++
    scrollX()

    CheckKeyboard()
    update_physics()
    draw_background()
    draw_player()
    check_player()
    draw_obstical()
    draw_overlay()
    CheckObstical()
    console.log(birdy)
    if (birdy <= 0) {
        vy = 0.5
        ay = 0 
    }

    if(clock % 740 == 0) {
        PlayerScore =  PlayerScore + 1
        let score = $("#Score")
        score.innerText = "Score: "+ PlayerScore
    
    }
    
    window.requestAnimationFrame(drawframe)
}

function StartGame() {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    drawframe()
}

const $ = (sel) => document.querySelector(sel)

setup_keyboard()
StartGame()

