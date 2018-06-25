# The Town Crier

<p align="center">
  <img src="https://raw.githubusercontent.com/sergiovhe/warriors-webhooks-app/master/img/ttc.jpg" alt="The Town Crier" width="380">
  <br>
</p>

[![Build Status](https://travis-ci.com/sergiovhe/warriors-webhooks-app.svg?branch=master)](https://travis-ci.com/sergiovhe/warriors-webhooks-app)

This app just post an actionable message card to an Office 365 group, it is intended to be used to manage events from TFS service hooks, for example when a pull request is created.

The following code represent the structure of the body to create an actionable message card:

```json
{
  "@context": "http://schema.org/extensions",
  "@type": "MessageCard",
  "themeColor": "0072C6",
  "title": "Visit the Outlook Dev Portal",
  "text": "Click **Learn More** to learn more about Actionable Messages!",
  "potentialAction": [
    {
      "@type": "ActionCard",
      "name": "Send Feedback",
      "inputs": [
        {
          "@type": "TextInput",
          "id": "feedback",
          "isMultiline": true,
          "title": "Let us know what you think about Actionable Messages"
        }
      ],
      "actions": [
        {
          "@type": "HttpPOST",
          "name": "Send Feedback",
          "isPrimary": true,
          "target": "http://..."
        }
      ]
    },
    {
      "@type": "OpenUri",
      "name": "Learn More",
      "targets": [
        { "os": "default", "uri": "https://docs.microsoft.com/en-us/outlook/actionable-messages" }
      ]
    }
  ]
}
```

To create a new service hook in VSTS go to Settings > Service Hooks and trigger the action with the desired event from TFS

More info: https://docs.microsoft.com/en-us/outlook/actionable-messages/actionable-messages-via-connectors
