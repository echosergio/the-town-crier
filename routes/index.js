var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/status', (req, res) =>
	res.json({
		status: "ok"
	})
);

router.post('/pullrequest', (req, res, next) => {

	var titile = req.body.resource.title
	var autor = req.body.resource.createdBy.displayName
	var link = req.body.resource._links.web.href
	var creation_date = req.body.resource.creationDate
	var repository = req.body.resource.repository.name

	request.post({
		headers: {
			'content-type': 'application/json'
		},
		url: process.env.WEBHOOKS_TEAMS_URL,
		body: `{
			"@type": "MessageCard",
			"@context": "http://schema.org/extensions",
			"themeColor": "0076D7",
			"summary": "${autor} created a new pull request",
			"sections": [{
				"activityTitle": "${autor} created a new pull request",
				"activitySubtitle": "${titile}",
				"facts": [{
					"name": "Repository",
					"value": "${repository}"
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
				{ "os": "default", "uri": "${link}" }
			]
			}]
		}`
	}, (error, response, body) => {
		if (error) {
			next(error)
		}

		res.json({
			status: 'success'
		});
	});
});

module.exports = router;