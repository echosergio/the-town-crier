var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.get('/pullrequest', function (req, res, next) {

  var pull_request_title = req.body.resource.title
  var developer_name = req.body.resource.createdBy.displayName
  var pull_request_url = req.body.resource._links.web.href
  var creation_date = req.body.resource.creationDate
  var repository_name = req.body.resource.repository.name

  request.post({
    headers: {
      'content-type': 'application/json'
    },
    url: process.env.WEBHOOKS_TEAMS_URL,
    body: `
      {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "themeColor": "0076D7",
        "summary": "${developer_name} created a new pull request",
        "sections": [{
            "activityTitle": "${developer_name} created a new pull request",
            "activitySubtitle": "${pull_request_title}",
            "activityImage": "https://pbs.twimg.com/profile_images/876923251741437953/IQsRzovW_400x400.jpg",
            "facts": [{
                "name": "Repository",
                "value": "${repository_name}"
            }, {
                "name": "Creation date",
                "value": "${creation_date}"
            }],
            "markdown": true
        }],
        "potentialAction": [{
          "@type": "OpenUri",
          "name": "Review",
          "targets": [
            { "os": "default", "uri": "${pull_request_url}" }
          ]
        }]
    }`
  }, function (err, response, body) {
    res.json({
      status: "success"
    });
  });
});

module.exports = router;