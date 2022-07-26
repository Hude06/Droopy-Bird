export function draw_obstical(ctx, obstical) {
    ctx.fillStyle = '#5696fc';
    ctx.fillRect(obstical.x,0,25,obstical.y)
    ctx.fillRect(obstical.x,obstical.y+100 , 25, 500)
    
}

export function CheckObstical(ctx, obstical, bird) {
    // if x < -1, move column back to the right
    if (obstical.x <= -1) {
        obstical.x = 500
    }
    if (bird.x >= obstical.x && bird.x < obstical.x + 100){
        if (bird.y < obstical.y) {
            bird.alive = false
        }
        if (bird.y > obstical.y + 100) {
            bird.alive = false
        }
    }
}