var mongoose = require('mongoose');

// MongoHQ Login settings

var dbUser = 'test'
  , dbPass = 'test001'
  , dbHost = 'paulo.mongohq.com'
  , dbPort = '10020'
  , dbName = 'github-stats'

mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName, function(error) {
  if (error) throw error
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

exports.getGitData = function(callback){
  // gitData.find({}, function (err, data) {
  //   if (err) throw err
  //   callback(null, data)
  // })
}