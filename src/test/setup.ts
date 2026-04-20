import "@testing-library/jest-dom/vitest";

// jsdom lacks IntersectionObserver — stub it for scroll-spy components.
class IOStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}
if (typeof globalThis.IntersectionObserver === "undefined") {
  // @ts-expect-error test stub
  globalThis.IntersectionObserver = IOStub;
}
