'use strict'

const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
const rimraf = require('rimraf')
const webpack = require('webpack')
const config = require('./webpack.build.conf')
const spinner = require('ora')('building for production...').start()

rimraf(`${config.output.path}/*`, (error) => {
  if (error) throw error

  webpack(config, (err, stats) => {
    spinner.stop()
    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
