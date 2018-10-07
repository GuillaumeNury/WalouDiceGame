module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: {
    '@core/models': '<rootDir>/src/core/models',
    '@core/services': '<rootDir>/src/core/services',
  },
};
