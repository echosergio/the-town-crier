var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.get('/giphy', function (req, res, next) {

  request(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${req.query.tag}`, {
    json: true
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }

    request.post({
      headers: {
        'content-type': 'application/json'
      },
      url: process.env.HOOKS_SLACK_URL,
      body: `{"text":"@channel PRRRRRRRRRRRRRRRRR\n <${res.body['data']['bitly_gif_url']}|GIPHY> "}`
    }, function (err, res, body) {
      res.json({
        status: "ko"
      });
    });
  });

  res.json({
    status: "success"
  });
});

module.exports = router;