const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
    this.timeout(15000);

    describe('/api/list?status=found&limit=10&skip=2&order=-1', function () {
        it('responds with status 200 requesting the found pets', function (done) {
            chai.request(app)
                .get('/api/list?status=found&limit=10&skip=2&order=-1')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('/api/list?status=lost&limit=10&skip=2&order=-1', function () {
        it('responds with status 200 requesting the lost pets', function (done) {
            chai.request(app)
                .get('/api/list?status=found&limit=10&skip=2&order=-1')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});