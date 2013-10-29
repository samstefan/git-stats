var mongoose = require('mongoose');

// MongoHQ Login settings

var dbUser = 'test'
  , dbPass = 'test001'
  , dbHost = 'paulo.mongohq.com'
  , dbPort = '10032'
  , dbName = 'node-gitstats'

mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName, function(error) {
  if (error) {
    serviceLocator.logger.error('Failed to connect to database: '+error)
  }
})

var gitCommitSchema = mongoose.Schema ({
  id: String,
  message: String,
  timestamp: String,
  url: String,
  added: String,
  removed: String,
  modified: String,
  authorName: String,
  authorUserName: String,
  authorEmail: String,
}, { collection: 'gitCommit' })

var gitRepoSchema = mongoose.Schema ({
  repoName: String,
  repoUrl: String,
  repoUrl: String,
  repoDescription: String,
  repoHomePage: String,
  repoWatchers: String,
  repoForks: String,
  repoPrivate: Boolean,
  repoOwnerName: String,
  repoOwnerEamil: String,

}, { collection: 'gitRepo' })

var gitRepo = mongoose.model('gitRepo', gitRepoSchema)
var gitCommit = mongoose.model('gitCommit', gitCommitSchema)

var getCommits =
  function(callback) {
    gitRepo.find({}, function (error, data) {
      if (error) {
        serviceLocator.logger.error('Error getting commits: '+error)
      } else {
        callback(null, data)
      }
    })
  }

exports.gitCommit = gitCommit
exports.getCommits = getCommits
exports.gitRepo = gitRepo