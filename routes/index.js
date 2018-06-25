let express = require('express');
let request = require('request');
let router = express.Router();

router.get('/status', (req, res) =>
    res.json({
        status: "ok"
    })
);

router.post('/pullrequest', (req, res, next) => {

    let webhooks_teams_url = req.headers['webhooks-teams-url']

    let titile = req.body.resource.title
    let autor = req.body.resource.createdBy.displayName
    let autor_id = req.body.resource.createdBy.uniqueName
    let autor_image = req.body.resource.createdBy.imageUrl
    let link = req.body.resource._links.web.href
    let creation_date = req.body.resource.creationDate
    let description = req.body.resource.description
    let project = req.body.resource.repository.project.name
    let repository = req.body.resource.repository.name

    request.post({
        headers: {
            'content-type': 'application/json'
        },
        url: webhooks_teams_url,
        body: `
		{
			"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
			"type": "AdaptiveCard",
			"version": "1.0",
			"body": [
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "Pull request",
							"weight": "bolder",
							"size": "medium"
						},
						{
							"type": "ColumnSet",
							"columns": [
								{
									"type": "Column",
									"width": "auto",
									"items": [
										{
											"type": "Image",
											"url": "${autor_image}",
											"size": "small",
											"style": "person"
										}
									]
								},
								{
									"type": "Column",
									"width": "stretch",
									"items": [
										{
											"type": "TextBlock",
											"text": "${autor}",
											"weight": "bolder",
											"wrap": true
										},
										{
											"type": "TextBlock",
											"spacing": "none",
											"text": "${autor_id}",
											"isSubtle": true,
											"wrap": true
										}
									]
								}
							]
						}
					]
				},
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "${titile}",
							"wrap": true
						},
						{
							"type": "FactSet",
							"facts": [
								{
									"title": "Repository:",
									"value": "${repository}"
								},
								{
									"title": "Project:",
									"value": "${project}"
								},
								{
									"title": "Description:",
									"value": "${description}"
								},
								{
									"title": "Creation date:",
									"value": "${creation_date}"
								}
							]
						}
					]
				},
				{
					"type": "ActionSet",
					"actions": [
						{
							"type": "Action.OpenUrl",
							"title": "Review",
							"url": "${link}"
						}
					]
				}
			]
		}
		`
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