var restify = require('restify')
  , bunyan = require('bunyan')
  , serviceLocator = require('service-locator').createServiceLocator()
  , mongoose = require('mongoose')
  , Bootstrap = require('./lib/mongohq')
  , SaveCommits = require('./models/save-commits')
  , SaveRepos = require('./models/save-repos')
  , GetCommits = require('./models/get-commits')

serviceLocator.register('logger', bunyan.createLogger({name: 'github-stats'}))

var bootstrap = new Bootstrap(serviceLocator)

bootstrap( function () {

  var server = restify.createServer({ name: 'github-stats' })

  server
    .use(restify.fullResponse())
    .use(restify.bodyParser())

  var saveCommits = SaveCommits(serviceLocator)
    , saveRepo = SaveRepos(serviceLocator)
    , getCommits = GetCommits(serviceLocator)

  // Hook POST from GitHub
  server.post('/hook', function (req, res, next) {
    var gitHookData = JSON.parse(req.params.payload)
    if (gitHookData) {

      serviceLocator.logger.info('Getting git hook data')
      saveCommits.save(gitHookData)  
      saveRepo.save(gitHookData, function (error, message) {
        if (error) {
          serviceLocator.logger.error(error)
        } else {
          serviceLocator.logger.info(message)
        }
      })

    } else {
      serviceLocator.logger.info('No POST data received :(')
    }
    res.end()
  })

  server.get('/:repo/commits/hour', function (req, res, next) {
    var repoName = req.params.repo
    getCommits.getHour(repoName, function (error, commits){
      if (error){
        serviceLocator.logger.error(error)
      } else {
        serviceLocator.logger.info('Getting a hour of commits form '+repoName)
        res.json(commits)
      }
    })
  })

  server.get('/:repo/commits/day', function (req, res, next) {
    var repoName = req.params.repo
    getCommits.getDay(repoName, function (error, commits){
      if (error){
        serviceLocator.logger.error(error)
      } else {
        serviceLocator.logger.info('Getting a day of commits form '+repoName)
        res.json(commits)
      }
    })
  })

  server.get('/:repo/commits/week', function (req, res, next) {
    var repoName = req.params.repo
    getCommits.getWeek(repoName, function (error, commits){
      if (error){
        serviceLocator.logger.error(error)
      } else {
        serviceLocator.logger.info('Getting a week of commits form '+repoName)
        res.json(commits)
      }
    })
  })

  server.listen(3010, function () {
    serviceLocator.logger.info('%s listening at %s', server.name, server.url)
  })
})