const sassParser = require('postcss-scss');
const path = require('path');

module.exports = {
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss'],
  processorOpts: {parser: sassParser},
  rootDir: path.join(__dirname, '../..')
};
