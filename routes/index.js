let express = require('express');
let router = express.Router();
let auth = require('../auth.js')();

let pull_request = require('./pull-request');

router.get('/', (req, res) =>
  res.json({
    name: "The Town Crier",
    description: "Promote actionable message cards to an Office 365 group",
    status: "OK",
    version: "1.1.0"
  })
);

router.use('/pull-request', auth.authenticate(), pull_request);

module.exports = router;