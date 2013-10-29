var mongoose = require('mongoose')
  , _ = require('lodash')
  , mongohq = require('./mongohq')


module.exports = function(serviceLocator) {

  function save(repo) {
    var currentRepoName = repo.repository.name

    // Check if repository already exists
    var repoExist = function () {
      var doesRepoExist = false
      gitRepo.find({}, function (error, data) {
        if (error) {
          serviceLocator.logger.error('Error getting commits: '+error)
        } else {
          _.forEach(data.repoName, function(repoName, i){
            if ( repoName === currentRepoName ) {
              serviceLocator.logger.info('Not saving repository, already exists')
              doesRepoExist = true
            }
          })    
        }
      })
      return doesRepoExist
    }

    if ( repoExist ) {
      var gitHookRepoDoc = new mongohq.gitRepo ({
        repoName: repo.repository.name,
        repoUrl: repo.repository.url,
        repoPushedAt: repo.repository.pushed_at,
        repoLanguage: repo.repository.language,
        repoDescription: repo.repository.description,
        repoWatchers: repo.repository.watchers,
        repoForks: repo.repository.forks,
        repoPrivate: repo.repository.private,
        repoOwnerName: repo.repository.owner.name,
        repoOwnerEamil: repo.repository.owner.email,
      })

      gitHookRepoDoc.save(function (error, gitHookRepoDoc) {
        serviceLocator.logger.info('Saving repository data from '+repo.repository.name+' to database')
        if (error) {
          serviceLocator.logger.error(error)
        }
      })
    }
  }

  return {
    save: save
  }
   
}