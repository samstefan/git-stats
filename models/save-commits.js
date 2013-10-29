var mongoose = require('mongoose')
  , mongohq = require('./mongohq')
  , _ = require('lodash')

module.exports = function(serviceLocator, hookData) {
  serviceLocator.logger.error(hookData)

  function saveCommits() {
    _.forEach(hookData.commits, function(commit, i){

      var gitHookCommitsDoc = new mongohq.gitCommit ({
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
        serviceLocator.logger.info('Saving commit '+gitHookData.id+' to database')
        if (error) {
          serviceLocator.logger.error(error)
        }
      })
    })
  }

  return {
    saveCommits: saveCommits
  }

}