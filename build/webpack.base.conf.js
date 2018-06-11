'use strict'
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'bloc': './src/bloc'
  },
  output: {
    filename: '[name].js',
    library: 'bloc'
  }
}
