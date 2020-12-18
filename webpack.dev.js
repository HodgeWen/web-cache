const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',

  entry: './examples/test-cache.ts',

  output: {
    path: path.resolve(__dirname, 'packages'),
    filename: 'cache.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  devServer: {
    hot: true,
    port: 7878
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],

  resolve: {
    extensions: ['.ts', '.js']
  }
}