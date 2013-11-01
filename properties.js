module.exports = function() {

  var database =
    { dbUser: 'test'
    , dbPass: 'test001'
    , dbHost: 'paulo.mongohq.com'
    , dbPort: '10032'
    , dbName: 'node-gitstats'
    }

  // Allowed domains for aJax requests
  var allowedDomains = 
    [ 'yourdomain.com'    
    , 'www.yourdomain.com'
    ]

  return {
    database: database,
    allowedDomains: allowedDomains
  }

}