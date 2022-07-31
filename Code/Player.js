export function draw_player(ctx, bird, img) {
  ctx.fillStyle = "#fce056";
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, bird.x, bird.y, 17 * 2, 12 * 2);


}

