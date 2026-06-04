module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [  
    'src/components/**/*.{ts,tsx}', 
    'src/Synth/Synth.functions.{ts,tsx}',
    'src/Synth/Synth.{ts,tsx}',
    '!src/components/**/*.test.{ts,tsx}',  
    '!src/components/**/*.types.{ts,tsx}',  
    '!src/**/*.d.ts'  
  ]
};
