var schemas = require('./schemas')

module.exports = function(serviceLocator) {

  // Check if repository already exists
  function findByName(currentRepoName, callback) {
    schemas.gitRepo.find({ repoName: currentRepoName }, function (error, data) {
      if (error) {
        serviceLocator.logger.error('Error getting commits: '+error)
        return callback(error)
      }

      if (data.length > 0) {
        callback(null, data)
      } else {
        callback(null, false)
      }
    })
  }

  function save(repo, callback) {
    var currentRepoName = repo.repository.name

    findByName(currentRepoName, function (error, returnedRepo) {
      if (error) return callback(error)
      if (!returnedRepo) {
        var gitHookRepoDoc = new schemas.gitRepo ({
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

        gitHookRepoDoc.save( function (error) {
          if (error) {
            serviceLocator.logger.error(error)
          } else {
            callback(null, console.log('saved'))
          }
        })
      } else {
        callback(null, returnedRepo)
      }
    })
  }

  return {
    save: save,
    findByName: findByName
  }
   
}