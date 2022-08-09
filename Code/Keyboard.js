export function CheckKeyboard(ctx, bird) {
  if (bird.jump_ready) {
    bird.vy = bird.vy - 4;
    bird.jump_ready = false;
  }
}

export function Setup_Keyboard(ctx, bird, Flap) {
  window.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.code === "Enter") {
      console.log("Enter was pressed");
      bird.keystate.enter = true;
      if (bird.alive === false) {
        document.location.reload(true);
      }
    }

    if (e.code === "Space") {
      bird.keystate.space = true;
      bird.jump_ready = true;
      Flap.play();
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      bird.keystate.space = false;
    }
    if (e.code === "Enter") {
      bird.keystate.enter = false;
    }
  });
}
