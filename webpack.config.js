const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/slido.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'slido.min.js',
    library: 'Slido',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
  })],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};