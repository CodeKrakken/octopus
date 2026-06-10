// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';  
  
global.crypto = {  
  randomUUID: () => 'mock-uuid-' + Math.random().toString(36).substr(2, 9)  
} as any;