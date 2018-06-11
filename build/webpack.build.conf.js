'use strict'
process.env.NODE_ENV = 'production'

const config = require('./config')
const webpack = require('webpack')
const path = require('path')
const report = require('webpack-bundle-analyzer')
const formatter = require('eslint-friendly-formatter')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const context = path.resolve(__dirname, '../')

const include = Object.values(config.entries)
  .map(rel => path.resolve(context, rel))

const webpackPlugins = [
  new webpack.DefinePlugin({ 'process.env': config.env }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new UglifyJsPlugin({
    sourceMap: true,
    parallel: true,
    uglifyOptions: {
      compress: { warnings: false }
    }
  })
]

if (process.env.npm_config_report) webpackPlugins.push(new report.BundleAnalyzerPlugin())

module.exports = {
  context,
  entry: config.entries,
  devtool: '#source-map',
  plugins: webpackPlugins,
  output: {
    path: path.resolve(context, config.output),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    library: [config.library, '[name]'],
    libraryExport: 'default',
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
