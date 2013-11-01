var restify = require('restify')
  , bunyan = require('bunyan')
  , serviceLocator = require('service-locator').createServiceLocator()
  , routes = require('./views')
  , Properties = require('./properties')
  , bootstrap = require('./lib/database')
  , properties = new Properties()

serviceLocator.register('logger', bunyan.createLogger({name: 'github-stats'}))
serviceLocator.register('properties', properties)

bootstrap(serviceLocator, function () {

  var server = restify.createServer({ name: 'github-stats' })

  server
    .use(restify.fullResponse())
    .use(restify.bodyParser())

  routes(serviceLocator, server)

  server.listen(3010, function () {
    serviceLocator.logger.info('%s listening at %s', server.name, server.url)
  })
})