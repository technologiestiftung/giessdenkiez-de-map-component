module.exports = {
  // Run type-check on changes to TypeScript files
  'src/**/*.ts?(x)': () => 'yarn type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  'src/**/*.(ts|js)?(x)': filenames => `yarn lint ${filenames.join(' ')}`,
};
