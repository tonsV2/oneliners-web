'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // TODO: This should be localhost:8080 and in cased of docker it should be overwritten by
  ONELINERS_API: '"https://api-oneliners.fitfit.dk"'
})
