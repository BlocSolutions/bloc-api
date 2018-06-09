'use strict'

const path = require('path').join
const webpack = require('webpack')
const pkg = require('../package.json')
const merge = require('webpack-merge')
const notifier = require('node-notifier')
const buildWebpackConfig = require('./webpack.build.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(buildWebpackConfig, {
  watch: true,
  stats: 'errors-only',
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: { messages: ['Ready'] },
      onErrors: (severity, errors) => {
        if (severity !== 'error') return;
        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()
        notifier.notify({
          title: pkg.name,
          message: severity + ': ' + error.name,
          subtitle: filename || '',
          icon: path(__dirname, 'logo.png')
        })
      }
    })
  ]
})
