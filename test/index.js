let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;
let nock = require('nock');

chai.use(chaiHttp);

let pullrequest = require('./tfs-events/git-pullrequest-created.json');
let incoming_webhook_url = "https://outlook.office365.com/webhook/test/IncomingWebhook/test/test";

describe('Status', () => {
    it('it should GET the status', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('status', 'OK');
                done();
            });
    });
});

describe('Pull Requests', () => {
    beforeEach(() => {
        nock(incoming_webhook_url)
            .post('')
            .reply(200);
    });

    it('it should POST the pull request to the channel incoming webhook', (done) => {
        chai.request(app)
            .post('/pull-request')
            .set('incoming-webhook-url', incoming_webhook_url)
            .auth('test', 'test')
            .send(pullrequest)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('status', 'success');
                done();
            });
    });
});