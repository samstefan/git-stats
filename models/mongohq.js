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

var gitDataSchema = mongoose.Schema({

}, { collection: 'gitData' })

var gitData = mongoose.model('gitData', gitDataSchema)

exports.getGitData = function(callback){
  // themes.find({}, function (err, data) {
  //   if (err) throw err
  //   callback(null, data)
  // })
}