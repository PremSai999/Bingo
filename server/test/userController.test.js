const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET /api/getUsers', () => {
  it('should return all users!"', (done) => {
    chai.request(server)
      .get('/api/getUsers')
      .end((err, res) => {
        // chai.expect(res).to.have.status(200);
        chai.expect(res.body.ok).to.equal(true);
        chai.expect(res.body).to.be.an('object')
        chai.expect(res.body.users).to.be.an('array')
        done();
      });
  });
});

describe('POST /api/login', () => {
  it('should log in a user with correct creds', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({ email: 'prem@gmail.com', password: 'prem' })
      .end((err, res) => {
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body).to.have.property('status').equal('ok');
        chai.expect(res.body).to.have.property('user').to.be.a('string');
        chai.expect(res.body).to.have.property('name').to.be.a('string');
        done();
      });
  });
  it('should handle invalid login', (done) => {
    chai.request(server)
      .post('/api/login')
      .send({ email: 'invalid@example.com', password: 'invalidpassword' })
      .end((err, res) => {
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body).to.have.property('status').equal('error');
        chai.expect(res.body).to.have.property('error').to.be.oneOf(['Invalid Email', 'Invalid Password']);
        done();
      });
  });
});
