var mongoose = require('mongoose')

module.exports = function(serviceLocator) {

  return function (callback) {
    // MongoHQ Login settings
    var dbUser = 'test'
      , dbPass = 'test001'
      , dbHost = 'paulo.mongohq.com'
      , dbPort = '10032'
      , dbName = 'node-gitstats'

    var db = mongoose.connection

    serviceLocator.register('db', db)

    db.on('error', function (error) {
      serviceLocator.logger.error('Error connecting to MongoHQ:', error)
    })

    db.once('open', function () {
      // serviceLocator.logger.info('Connected to MongoHQ')
      callback(db)
    })

    mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName)
  }

}