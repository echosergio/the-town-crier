let express = require('express');
let request = require('request');
let router = express.Router();

router.post('/', (req, res, next) => {

    let incoming_webhook_url = req.headers['incoming-webhook-url']

    let titile = req.body.resource.title
    let autor = req.body.resource.createdBy.displayName
    let link = req.body.resource._links.web.href
    let creation_date = req.body.resource.creationDate
    let repository = req.body.resource.repository.name

    request.post({
        headers: {
            'content-type': 'application/json'
        },
        url: incoming_webhook_url,
        body: `{
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "0076D7",
            "summary": "${autor} created a new pull request",
            "sections": [
                {
                    "activityTitle": "${autor} created a new pull request",
                    "activitySubtitle": "${titile}",
                    "facts": [
                        {
                            "name": "Repository",
                            "value": "${repository}"
                        },
                        {
                            "name": "Creation date",
                            "value": "${creation_date}"
                        }
                    ],
                    "markdown": true
                }
            ],
            "potentialAction": [
                {
                    "@type": "OpenUri",
                    "name": "Review",
                    "targets": [
                        {
                            "os": "default",
                            "uri": "${link}"
                        }
                    ]
                }
            ]
        }`
    }, (error, response, body) => {
        if (error) {
            console.log(error)
            next(error)
        } else {
            res.json({
                status: 'success'
            });
        }
    });
});

module.exports = router;