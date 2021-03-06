var schemas = require('./schemas')
  , moment = require('moment')

module.exports = function(serviceLocator) {

  function getHour(repoName, callback) {
    findCommitsForDate(new Date(moment().subtract('hours', 1)), repoName, callback)
  }

  function getDay(repoName, callback) {
    findCommitsForDate(new Date(moment().subtract('days', 1)), repoName, callback)
  }

  function getWeek(repoName, callback) {
    findCommitsForDate(new Date(moment().subtract('weeks', 1)), repoName, callback)
  }

  function getFilter(date, repoName) {

    if (repoName === 'all') {
      timestamp: { $gt: date }
    } else {
      return {
        timestamp: { $gt: date }
      , commitedRepo: repoName
      }
    }
  }

  function findCommitsForDate(date, repoName, callback) {
    var filter = getFilter(date, repoName)

    schemas.gitCommit.find(filter, function (error, data) {
      if (error) {
        return callback(error) 
      } else {
        callback(null, data)
      }
    })
  }

  return {
    getHour: getHour,
    getDay: getDay,
    getWeek: getWeek,
  }

}