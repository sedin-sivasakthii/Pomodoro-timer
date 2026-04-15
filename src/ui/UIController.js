import { renderTime, renderMode } from "./Renderer.js";

export class UIController {
  constructor() {
    this.timeEl = document.getElementById("time");
    this.modeEl = document.getElementById("mode");

    this.startBtn = document.getElementById("start");
    this.pauseBtn = document.getElementById("pause");
    this.resetBtn = document.getElementById("reset");
  }

  bindEvents({ onStart, onPause, onReset }) {
    this.startBtn.addEventListener("click", onStart);
    this.pauseBtn.addEventListener("click", onPause);
    this.resetBtn.addEventListener("click", onReset);
  }

  update({ seconds, mode }) {
    renderTime(this.timeEl, seconds);
    renderMode(this.modeEl, mode);
  }
}