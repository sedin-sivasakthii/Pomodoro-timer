import { formatTime } from "../utils/time.js";

export const renderTime = (element, seconds) => {
  if (!element) return; // guard clause

  element.textContent = formatTime(seconds);
};

export const renderMode = (element, mode) => {
    if (!element) return;
  
    element.textContent = mode;
    element.style.color = mode === "WORK" ? "red" : "green";
  };