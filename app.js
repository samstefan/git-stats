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
  
  var gitHookData = JSON.parse(req.params.payload)

  if (gitHookData) {
    serviceLocator.logger.info('Getting git hook data')

    _.forEach(gitHookData.commits, function(gitHookData, i){
      serviceLocator.logger.info('Starting loop for commits')

      var gitHookCommitsDoc = new mongohq.gitCommit ({
        id: gitHookData.id,
        message: gitHookData.message,
        timestamp: gitHookData.timestamp,
        url: gitHookData.url,
        added: gitHookData.added,
        removed: gitHookData.removed,
        modified: gitHookData.modified,
        authorName: gitHookData.author.name,
        authorUserName: gitHookData.author.username,
        authorEmail: gitHookData.author.email
      })

      gitHookCommitsDoc.save(function (error, gitHookCommitsDoc) {
        if (error) {
          serviceLocator.logger.error(error)
        }
      })
    })
  
  } else {
    serviceLocator.logger.info('No POST data received')
  }

  res.end()

})

server.get('/commits', function (req, res, next) {
  mongohq.getGitData(function(error, themes){
    if (error){
      serviceLocator.logger.error(error)
    } else {

    }
  })
})

server.listen(3010, function () {
  serviceLocator.logger.info('%s listening at %s', server.name, server.url)
})