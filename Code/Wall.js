export function draw_background(ctx,) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 500);

}

export function CheckTopWall(ctx, bird) {
  if (bird.y <= 0) {
    bird.vy = 1;
  }
}

export function CheckBottomWall (ctx, bird) {
  if (bird.y >= 420) {
    bird.alive = false;
  }
}
