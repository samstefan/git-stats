var mongoose = require('mongoose');

var gitCommitSchema = mongoose.Schema ({
  id: String,
  commitedRepo: String,
  message: String,
  timestamp: Date,
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
  repoPushedAt: String,
  repoLanguage: String,
  repoDescription: String,
  repoWatchers: String,
  repoForks: String,
  repoPrivate: Boolean,
  repoOwnerName: String,
  repoOwnerEamil: String,
}, { collection: 'gitRepo' })

var gitCommit = mongoose.model('gitCommit', gitCommitSchema)
  , gitRepo = mongoose.model('gitRepo', gitRepoSchema)

exports.gitCommit = gitCommit
exports.gitRepo = gitRepo