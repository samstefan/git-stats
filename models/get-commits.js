var mongoose = require('mongoose')
  , schemas = require('./schemas')
  , async = require('async')

module.exports = function(serviceLocator) {

  var date = new Date()
    , hour = date.getHours()
    , min = date.getMinutes()
    , month = date.getMonth()
    , year = date.getFullYear()
    , sec = date.getSeconds()
    , day = date.getDate()

  function getHour(repoName, callback) {
    schemas.gitCommit.find({ timestamp: { $lt: new Date(), $gt: new Date(year+','+month+','+day+','+hour+','+min+','+sec) }, commitedRepo: repoName }, function (error, data) {
      if (error) {
        return callback(error) 
      } else {
        callback(null, data)
      }
    })
  }

  function getDay(repoName, callback) {
    schemas.gitCommit.find({ timestamp: { $lt: new Date(), $gt: new Date(year+','+month+','+day) }, commitedRepo: repoName }, function (error, data) {
      if (error) {
        return callback(error) 
      } else {
        callback(null, data)
      }
    })
  }

  function getWeek(repoName, callback) {
    schemas.gitCommit.find({ timestamp: { $lt: new Date(), $gt: new Date(year+','+month+','+day*7) }, commitedRepo: repoName }, function (error, data) {
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