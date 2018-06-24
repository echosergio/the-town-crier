let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;
let nock = require('nock');

let config = require('config');
let pullrequest = require('./git-pullrequest-created.json');

chai.use(chaiHttp);

describe('/GET status', () => {
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

describe('/POST pullrequest', () => {
    beforeEach(() => {
        nock(config.WEBHOOKS_TEAMS_URL)
            .post('')
            .reply(200);
    });

    it('it should POST the pull request to the channel web hook', (done) => {
        chai.request(app)
            .post('/pullrequest')
            .send(pullrequest)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('status', 'success');
                done();
            });
    });
});