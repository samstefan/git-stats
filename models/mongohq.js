var mongoose = require('mongoose');

module.exports = function(serviceLocator) {

// MongoHQ Login settings

var dbUser = 'test'
  , dbPass = 'test001'
  , dbHost = 'paulo.mongohq.com'
  , dbPort = '10020'
  , dbName = 'github-stats'

mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName, function(error) {
  if (error) {
    serviceLocator.logger.error('Failed to connect to database.')
  }
})

  var gitCommitSchema = mongoose.Schema({
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

  var gitRepoSchema = mongoose.Schema({
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

  return
    [ gitRepo
    , gitCommit
    ]
}