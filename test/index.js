let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;
let nock = require('nock');

chai.use(chaiHttp);

let pullrequest = require('./tfs-events/git-pullrequest-created.json');
let webhooks_teams_url = "https://outlook.office365.com/webhook/test/IncomingWebhook/test/test";

describe('Status', () => {
    it('it should GET the status', (done) => {
        chai.request(app)
            .get('/status')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('status', 'ok');
                done();
            });
    });
});

describe('Pull Requests', () => {
    beforeEach(() => {
        nock(webhooks_teams_url)
            .post('')
            .reply(200);
    });

    it('it should POST the pull request to the channel web hook', (done) => {
        chai.request(app)
            .post('/pullrequest')
            .set('webhooks-teams-url', webhooks_teams_url)
            .send(pullrequest)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('status', 'success');
                done();
            });
    });
});