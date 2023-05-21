// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    '\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.svg$': 'jest-transform-stub',
    '\\.(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};