globalThis.CSS = {
  supports: () => false
};

// Mock window.scrollTo
window.scrollTo = jest.fn();
