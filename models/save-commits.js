var mongoose = require('mongoose')
  , schemas = require('./schemas')
  , async = require('async')

module.exports = function(serviceLocator) {

  function save(hookData) {
    async.each(hookData.commits, function(commit, i){

      var gitHookCommitsDoc = new schemas.gitCommit ({
        id: commit.id,
        commitedRepo: hookData.repository.name,
        message: commit.message,
        timestamp: commit.timestamp,
        url: commit.url,
        added: commit.added,
        removed: commit.removed,
        modified: commit.modified,
        authorName: commit.author.name,
        authorUserName: commit.author.username,
        authorEmail: commit.author.email
      })

      gitHookCommitsDoc.save(function (error, gitHookCommitsDoc) {
        serviceLocator.logger.info('Saving commit '+commit.id+' to database')
        if (error) {
          serviceLocator.logger.error(error)
        }
      })
    })
  }

  return {
    save: save
  }

}