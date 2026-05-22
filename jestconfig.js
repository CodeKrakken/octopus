// jest.config.js

module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/index.tsx',
  ],
}