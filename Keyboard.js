export function CheckKeyboard(ctx, bird) {
  if (bird.jump_ready) {
    bird.vy = bird.vy - 2;
    bird.jump_ready = false;
  }
}

export function Setup_Keyboard(ctx, bird) {
  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.code === "Space") {
      bird.keystate.space = true;
      bird.jump_ready = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      bird.keystate.space = false;
    }
  });
}
