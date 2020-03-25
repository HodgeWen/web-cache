const path = require('path')

module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, 'lib/cache.ts'),

  output: {
    path: path.resolve(__dirname, 'packages'),
    filename: 'cache.js',
    libraryTarget: 'umd',
    library: 'WebCache',
    libraryExport: 'default'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'lib'),
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts']
  }
}