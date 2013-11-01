module.exports = function() {

  var database =
    { dbUser: 'test'
    , dbPass: 'test001'
    , dbHost: 'paulo.mongohq.com'
    , dbPort: '10032'
    , dbName: 'node-gitstats'
    }

  return {
    database: database
  }

}