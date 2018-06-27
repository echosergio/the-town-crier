let express = require('express');
let router = express.Router();

var pull_request = require('./pull-request');

router.get('/status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/pull-request', pull_request);

module.exports = router;