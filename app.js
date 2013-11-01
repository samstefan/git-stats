var restify = require('restify')
  , bunyan = require('bunyan')
  , serviceLocator = require('service-locator').createServiceLocator()
  , routes = require('./views')
  , cors = require('./lib/middleware/cors')
  , Properties = require('./properties')
  , bootstrap = require('./lib/database')
  , properties = new Properties()
  , allowedDomains = []

serviceLocator.register('logger', bunyan.createLogger({name: 'github-stats'}))
serviceLocator.register('properties', properties)

bootstrap(serviceLocator, function () {

  var server = restify.createServer({ name: 'github-stats' })

  allowedDomains = serviceLocator.properties.allowedDomains

  server
    .use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(cors(allowedDomains))

  routes(serviceLocator, server)

  server.listen(3010, function () {
    serviceLocator.logger.info('%s listening at %s', server.name, server.url)
  })
})