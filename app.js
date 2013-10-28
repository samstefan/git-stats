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
  if (req.params) {
    var gitHookData = JSON.parse(req.params)
    
    async.each(gitHookData.commits, function(error){
      console.log(CommitsData)
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