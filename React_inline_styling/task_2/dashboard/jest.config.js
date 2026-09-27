module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/fileMock.js',
  },
};
