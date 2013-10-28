var restify = require('restify')
  , bunyan = require('bunyan')
  , async = require('async')
  , _ = require('lodash')
  , serviceLocator = require('service-locator').createServiceLocator()
  , mongoose = require('mongoose')
  , mongohq = require('./models/mongohq')

serviceLocator.register('logger', bunyan.createLogger({name: 'github-stats'}))

var server = restify.createServer({ name: 'github-stats' })
 
server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

server.post('/hook', function (req, res, next) {

  var gitHookData = req.params

  if (gitHookData) {
    serviceLocator.logger.info('Getting git hook data')
    _.forEach(gitHookData.commits, function(gitHookData, error){
      serviceLocator.logger.info('Starting loop for comments')
      serviceLocator.logger.info(gitHookData)
    })
  }

  // var gitHookCommitsDoc = new gitData({
  //   id: gitHookData.
  // }) 

})

// server.get('/hook', function (req, res, next) {
//   mongohq.getGitData(function(error, themes){
//     if (error){
//       serviceLocator.logger.error(error)
//     } else {

//     }
//   })
// })

server.listen(3010, function () {
  serviceLocator.logger.info('%s listening at %s', server.name, server.url)
})