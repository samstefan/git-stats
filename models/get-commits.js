var mongoose = require('mongoose')
  , schemas = require('./schemas')
  , async = require('async')

module.exports = function(serviceLocator) {

  var d = new Date()
    , hour = d.getHours()
    , min = d.getMinutes()
    , month = d.getMonth()
    , year = d.getFullYear()
    , sec = d.getSeconds()
    , day = d.getDate()


  function getDay(repoName, callback) {

    // var o = {}

    // o.map = function () {
    //   emit(this.commitedRepo);
    // }

    // o.reduce = function (k, vals) { return vals.length }

    // schemas.gitCommit.mapReduce(o, function (err, results) {
    //   console.log(results)
    // })

    schemas.gitCommit.find({ timestamp: { $lt: new Date(), $gt: new Date(year) }}, function (error, data) {
      if (error) {
        return callback(error) 
      } else {
        console.log(data)
      }
    })


    // gitCommit.find({}, function (error, data) {
    //   if (error) {
    //     return callback(error) 
    //   } else {
    //     callback(null, data)
    //   }
    // })
  }

  return {
    getDay: getDay
  }

}