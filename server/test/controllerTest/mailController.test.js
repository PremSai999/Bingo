const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const mailController = require("../../controllers/mailController");
const transporter = require("../../models/mail.model");
const emailExistence = require("email-existence");

describe("Mail controller test", () => {
    let sendMailStub;
    let checkStub;
    let req;
    let res;

    beforeEach(() => {
        sendMailStub = sinon.stub(transporter, "sendMail");
        checkStub = sinon.stub(emailExistence, "check");

        req = {
            body: {
                name: "Test User",
                email: "test@example.com",
                room: "1234",
            },
        };

        res = {
            json: sinon.spy(),
        };
    });

    afterEach(() => {
        sendMailStub.restore();
        checkStub.restore();
    });

    describe("sendWinnerMail", () => {
        it("should send a winner mail", async () => {
            checkStub.yields(null, true);
            sendMailStub.resolves({});
            await mailController.sendWinnerMail(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "ok",
                    message: "Email sent successfully",
                })
            ).to.be.true;
        });

        it("should handle errors when checking mail", async () => {
            checkStub.yields(new Error("Error checking email"), null);
            await mailController.sendWinnerMail(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "error",
                    error: "Error checking email",
                })
            ).to.be.true;
        });

        it("should handle errors when sending a winner mail", async () => {
            checkStub.yields(null, true);
            sendMailStub.rejects(new Error("Error sending email"));
            await mailController.sendWinnerMail(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "error",
                    error: "Error sending email",
                })
            ).to.be.true;
        });

        it("should handle invalid email addresses", async () => {
            checkStub.yields(null, false);
            await mailController.sendWinnerMail(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({ status: "error", message: "Wrong email" })
            ).to.be.true;
        });
    });

    describe("sendMailInvite", () => {
        it("should send a winner mail", async () => {
            checkStub.yields(null, true);
            sendMailStub.resolves({});
            await mailController.sendMailInvite(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "ok",
                    message: "Email sent successfully",
                })
            ).to.be.true;
        });

        it("should handle errors when checking mail", async () => {
            checkStub.yields(new Error("Error checking email"), null);
            await mailController.sendMailInvite(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "error",
                    error: "Error checking email",
                })
            ).to.be.true;
        });

        it("should handle errors when sending a winner mail", async () => {
            checkStub.yields(null, true);
            sendMailStub.rejects(new Error("Error sending email"));
            await mailController.sendMailInvite(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "error",
                    error: "Error sending email",
                })
            ).to.be.true;
        });

        it("should handle invalid email addresses", async () => {
            checkStub.yields(null, false);
            await mailController.sendMailInvite(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({ status: "error", message: "Wrong email" })
            ).to.be.true;
        });
    });
});

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../server');

// chai.use(chaiHttp);

// describe('POST /mail/sendMail', () => {
//     it('should send a mail if email exists', (done) => {
//       chai.request(server)
//         .post('/mail/sendMail')
//         .send({ email: 'nifib56249@seosnaps.com', name: 'nifty' })
//         .end((err, res) => {
//           chai.expect(res).to.have.status(200);
//           chai.expect(res.body).to.be.an('object');
//           chai.expect(res.body).to.have.property('status').equal('ok');
//           chai.expect(res.body).to.have.property('message').equal('Email sent successfully');
//           done();
//         });
//     });
//     it('should fail if email does not exist', (done) => {
//       chai.request(server)
//         .post('/mail/sendMail')
//         .send({ email: 'prem@gmail.com', name: 'random' })
//         .end((err, res) => {
//           chai.expect(res).to.have.status(200);
//           chai.expect(res.body).to.be.an('object');
//           chai.expect(res.body).to.have.property('status').equal('error');
//           chai.expect(res.body).to.have.property('message').equal("Wrong email");
//           done();
//         });
//     });
//   });
