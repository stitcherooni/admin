module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
      // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/src/tests-utils/stylesMock.ts',
  },
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
    "^.+\\.(ts|tsx|js|jsx)$": [
      'ts-jest', {
          tsconfig: 'tsconfig.json',
          isolatedModules: false,
          diagnostics: false,
      },
    ]
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@azure/msal-react)'
  ],
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: 'reports', outputName: 'report.xml'}],
  ],
   // to obtain access to the matchers.
  setupFilesAfterEnv: ['<rootDir>/src/tests-utils/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};