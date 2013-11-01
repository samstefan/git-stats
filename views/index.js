var commits = require('./commits')
  , hooks = require('./hooks')

module.exports = function (serviceLocator, server) {
  commits(serviceLocator, server)
  hooks(serviceLocator, server)
}