'use strict'
process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const formatter = require('eslint-friendly-formatter')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('./webpack.base.conf')
const include = Object.values(config.entry)
  .map(rel => path.resolve(config.context, rel))

module.exports = merge(config, {
  devtool: '#source-map',
  output: {
    path: path.resolve(config.context, 'dist'),
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': '"production"' }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({ sourceMap: true, parallel: true })
  ],
  module: {
    rules: [
      {
        include,
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: { formatter, fix: true }
          }
        ]
      },
      {
        include,
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
})
