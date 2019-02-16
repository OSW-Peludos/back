const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
    this.timeout(15000);

    describe('/api/animal/id=5c67ff7d59c98e40d3072e05', function () {
        it('retrieves a pet record with the indicated id', function (done) {
            chai.request(app)
                .get('/api/animal?id=5c67ff7d59c98e40d3072e05')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body._id).not.undefined;
                    done();
                });
        });
    });
});