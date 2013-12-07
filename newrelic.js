exports.config =
{ app_name : ['Git Stats']
, license_key : ''
, logging :
  { level : 'info'
  , filepath : __dirname + '/newrelic_agent.log'
  }
, capture_params: true
}