var mongoose = require('mongoose')

module.exports = function(serviceLocator, callback) {
    // MongoHQ Login settings
  var dbUser = serviceLocator.properties.database.dbUser
    , dbPass = serviceLocator.properties.database.dbPass
    , dbHost = serviceLocator.properties.database.dbHost
    , dbPort = serviceLocator.properties.database.dbPort
    , dbName = serviceLocator.properties.database.dbName

  var db = mongoose.connection

  db.on('error', function (error) {
    serviceLocator.logger.error('Error connecting to database:', error)
  })

  db.once('open', function () {
    serviceLocator.logger.info('Connected to database')
    callback(db)
  })

  mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName)

}