const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);


describe('POST /mail/sendMail', () => {
    it('should send a mail if email exists', (done) => {
      chai.request(server)
        .post('/mail/sendMail')
        .send({ email: 'nifib56249@seosnaps.com', name: 'nifty' })
        .end((err, res) => {
          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body).to.have.property('status').equal('ok');
          chai.expect(res.body).to.have.property('message').equal('Email sent successfully');
          done();
        });
    });
    it('should fail if email does not exist', (done) => {
      chai.request(server)
        .post('/mail/sendMail')
        .send({ email: 'prem@gmail.com', name: 'random' })
        .end((err, res) => {
          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body).to.have.property('status').equal('error');
          chai.expect(res.body).to.have.property('message').equal("Wrong email");
          done();
        });
    });
  });
  
