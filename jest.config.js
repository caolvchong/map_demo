module.exports = {
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
  testMatch: ['<rootDir>/__test__/**/*.(spec|test).js?(x)'],
  collectCoverage: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules']
}
