Git Stats
==========

A small node app that saves commit details to a database using Git hooks and makes them accessible via a JSON API.

## Install

Clone the project then change into the directory and

`npm install`

Then update the properties.js file with your database settings.

## Usage

To start collecting hook data you need to point your repository hook at `localhost:3010/hook`

### API

Commits for the hour:

`localhost:3010/:reponame/commits/hour`

Commits for the day

`localhost:3010/:reponame/commits/day`

Commits for the week

`localhost:3010/:reponame/commits/week`

#### Example API Response

```
[
  {
  "id": "8f677c5d49439b35dd9901c6a7265d511787502e",
  "commitedRepo": "hooks-test",
  "message": "test",
  "timestamp": "2013-11-01T09:08:09.000Z",
  "url": "https://github.com/samstefan/hooks-test/commit/8f677c5d49439b35dd9901c6a7265d511787502e",
  "added": "fgsdfgfsdg",
  "removed": "",
  "modified": "",
  "authorName": "Sam Stefan",
  "authorUserName": "samstefan",
  "authorEmail": "sam@dpov.co.uk",
  "_id": "52736f812f262a9864000001",
  "__v": 0
  }
]

```
