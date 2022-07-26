export function draw_obstacle(ctx, obstacle) {
  ctx.fillStyle = "#5696fc";
  ctx.fillRect(obstacle.x, 0, 25, obstacle.y);
  ctx.fillRect(obstacle.x, obstacle.y + 100, 25, 500);
}

export function CheckObstacle(ctx, obstacle, bird) {
  // if x < -1, move column back to the right
  if (obstacle.x <= -1) {
    obstacle.x = 500;
  }
  if (bird.x >= obstacle.x && bird.x < obstacle.x + 100) {
    if (bird.y < obstacle.y) {
      bird.alive = false;
    }
    if (bird.y > obstacle.y + 100) {
      bird.alive = false;
    }
  }
}
