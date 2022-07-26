export function update_physics(ctx, bird) {
    bird.vy = bird.vy + bird.ay;
    bird.y = bird.y + bird.vy;
  }

