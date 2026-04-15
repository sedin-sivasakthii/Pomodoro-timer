import { WORK_DURATION, BREAK_DURATION, MODES } from "../config/constants.js";
import { TimerState } from "./TimerState.js";
import { assert } from "../utils/assert.js";
 
export class Timer {
  #seconds;
  #mode;
  #intervalId;
  #state;
  #onTick;
  #onModeChange;
 
  constructor({ onTick, onModeChange }) {
    // Bouncer Pattern
    assert(typeof onTick === "function", "onTick must be function");
    assert(typeof onModeChange === "function", "onModeChange must be function");
 
    this.#seconds = WORK_DURATION;
    this.#mode = MODES.WORK;
    this.#intervalId = null;
    this.#state = TimerState.IDLE;
 
    this.#onTick = onTick;
    this.#onModeChange = onModeChange;
  }
 
  start() {
    if (this.#state === TimerState.RUNNING) return;
 
    this.#state = TimerState.RUNNING;
 
    this.#intervalId = setInterval(() => {
      this.#tick();
    }, 1000);
  }
 
  pause() {
    if (this.#state !== TimerState.RUNNING) return;
 
    clearInterval(this.#intervalId);
    this.#state = TimerState.PAUSED;
  }
 
  reset() {
    clearInterval(this.#intervalId);
 
    this.#mode = MODES.WORK;
    this.#seconds = WORK_DURATION;
    this.#state = TimerState.IDLE;
 
    this.#emit();
  }
 
  #tick() {
    if (this.#seconds <= 0) {
      this.#switchMode();
      return;
    }
 
    this.#seconds--;
    this.#emit();
  }
 
  #switchMode() {
    const isWork = this.#mode === MODES.WORK;
 
    this.#mode = isWork ? MODES.BREAK : MODES.WORK;
    this.#seconds = isWork ? BREAK_DURATION : WORK_DURATION;
 
    this.#emit();
  }
 
  #emit() {
    this.#onTick({
      seconds: this.#seconds,
      mode: this.#mode,
    });
  }
}