import { Timer } from "./core/Timer.js";
import { UIController } from "./ui/UIController.js";

const ui = new UIController();

const timer = new Timer({
    onTick: (data) => ui.update(data),
    onModeChange: (mode) => {
      console.log("Mode switched:", mode);
    },
  });

// Event wiring (Happy Path Left)
ui.bindEvents({
  onStart: () => timer.start(),
  onPause: () => timer.pause(),
  onReset: () => timer.reset(),
});