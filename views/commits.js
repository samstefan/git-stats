var GetCommits = require('../models/get-commits')

module.exports = function (serviceLocator, server) {

  var getCommits = new GetCommits(serviceLocator)

  server.get('/:repo/commits/hour', function (req, res) {
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

  server.get('/:repo/commits/day', function (req, res) {
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

  server.get('/:repo/commits/week', function (req, res) {
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
}