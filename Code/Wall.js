export function draw_background(ctx, w) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 500);
}

export function CheckTopWall(ctx, bird) {
  if (bird.y <= 0) {
    bird.vy = 1;
  }
}
