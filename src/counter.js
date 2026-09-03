export function createCounter() {
  let count = 0;

  return {
    get value() {
      return count;
    },
    increment() {
      count += 1;
      return count;
    },
    reset() {
      count = 0;
      return count;
    },
  };
}
