const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('../tsconfig.json');

const cleanup = tsConfigPaths.register({
  baseUrl: './dist',
  paths: tsConfig.compilerOptions.paths,
});

// cleanup();
