var SaveCommits = require('../models/save-commits')
  , SaveRepos = require('../models/save-repos')

module.exports = function (serviceLocator, server) {

  var saveCommits = new SaveCommits(serviceLocator)
    , saveRepo = new SaveRepos(serviceLocator)

  // Hook POST from GitHub
  server.post('/hook', function (req, res) {
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
}