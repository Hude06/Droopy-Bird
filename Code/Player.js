export function draw_player(ctx, bird) {
  ctx.fillStyle = "#fce056";
  ctx.fillRect(bird.x, bird.y, 25, 25);
}
export function check_player(ctx, bird) {
  if (bird.y >= 475) {
    bird.alive = false;
  }
}
