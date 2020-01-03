'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.172.1.109:8080"',
  ADMIN_API:'http://192.172.1.140/ggzy/jsgc',
})
