'use strict'
process.env.NODE_ENV = 'production'

const config = require('./config')
const path = require('path').resolve
const report = require('webpack-bundle-analyzer')
const formatter = require('eslint-friendly-formatter')
const root = path(__dirname, '../')
const include = Object.values(config.entries)
  .map(rel => path(root, rel))

const webpackPlugins = [
  new webpack.DefinePlugin({ 'process.env': config.env }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new report.BundleAnalyzerPlugin()
]

if (!process.env.npm_config_report) webpackPlugins.pop()

module.exports = {
  context: root,
  entry: config.entries,
  devtool: '#source-map',
  plugins: webpackPlugins,
  output: {
    path: path(root, config.output),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    library: [config.library, '[name]'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      include,
      test: /\.js$/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: { formatter, fix: true }
      }]
    }, {
      include,
      test: /\.js$/,
      use: ['babel-loader']
    }]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
