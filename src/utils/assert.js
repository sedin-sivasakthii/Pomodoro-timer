export const assert = (condition, message) => {
  if (condition) return;
  throw new Error(`[Assertion Failed]: ${message}`);
};
