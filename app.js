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

    // Loop through the commits then save them
    _.forEach(gitHookData.commits, function(gitHookData, i){
      serviceLocator.logger.info('Starting loop '+i+' for commits')

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
        serviceLocator.logger.info('Saving commit '+gitHookData.id+' to database')
        if (error) {
          serviceLocator.logger.error(error)
        }
      })
    })

    // Save the repository information
    var gitHookRepoDoc = new mongohq.gitRepo ({
      repoName: gitHookData.repository.name,
      repoUrl: gitHookData.repository.url,
      repoPushedAt: gitHookData.repository.pushed_at,
      repoLanguage: gitHookData.repository.language,
      repoDescription: gitHookData.repository.description,
      repoWatchers: gitHookData.repository.watchers,
      repoForks: gitHookData.repository.forks,
      repoPrivate: gitHookData.repository.private,
      repoOwnerName: gitHookData.repository.owner.name,
      repoOwnerEamil: gitHookData.repository.owner.email,
    })

    gitHookRepoDoc.save(function (error, gitHookRepoDoc) {
      serviceLocator.logger.info('Saving repository data from '+gitHookData.repository.name+' to database')
      if (error) {
        serviceLocator.logger.error(error)
      }
    })

  } else {
    serviceLocator.logger.info('No POST data received :(')
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