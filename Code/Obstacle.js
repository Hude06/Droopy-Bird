export function draw_obstacle(ctx, obstacle, pipe_image, pipe_headless) {
  ctx.fillStyle = "#4BAE4E";
  ctx.drawImage(pipe_image, obstacle.x, obstacle.y + 100);
  ctx.drawImage(pipe_headless, obstacle.x, obstacle.y + 100 + 300);
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);
  ctx.scale(1, -1);
  ctx.drawImage(pipe_image, 0, 0);
  ctx.drawImage(pipe_headless, 0, 0 + 300);

  ctx.restore();
}

export function CheckObstacle(ctx, obstacle, bird) {
  // if x < -1, move column back to the right
  if (obstacle.x <= -1) {
    obstacle.x = 500;
    obstacle.y = Math.floor(Math.random() * 300);
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
