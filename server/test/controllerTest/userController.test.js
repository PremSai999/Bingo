const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const bcrypt = require("bcrypt");
const userController = require("../../controllers/userController");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

describe("User controller test", () => {
    let hashStub;
    let createStub;
    let findOneStub;
    let compareStub;
    let signStub;
    let findStub;
    let aggregateStub;
    let req;
    let res;

    beforeEach(() => {
        hashStub = sinon.stub(bcrypt, "hash");
        createStub = sinon.stub(User, "create");
        findOneStub = sinon.stub(User, "findOne");
        compareStub = sinon.stub(bcrypt, "compare");
        signStub = sinon.stub(jwt, "sign");
        findStub = sinon.stub(User, "find");
        aggregateStub = sinon.stub(User, "aggregate");

        req = {
            body: {
                name: "Test User",
                email: "test@example.com",
                password: "prem",
            },
            query: {
                query: "searchQuery",
            },
            params: {
                user: "Test User",
            },
        };

        res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });
    afterEach(() => {
        hashStub.restore();
        createStub.restore();
        findOneStub.restore();
        compareStub.restore();
        signStub.restore();
        findStub.restore();
        aggregateStub.restore();
    });

    describe("Signup", () => {
        const hashedPassword =
            "$2a$10$i2jCh1uiph97eYkKRx9ayeFkmP3wE32lzOy5Hf.6/h6OiO2zWlBGC";
        const user = {
            name: "Test User",
            email: "test@example.com",
            password: hashedPassword,
        };

        it("should create a new user and return success", async () => {
            hashStub.resolves(hashedPassword);
            createStub.resolves(user);
            await userController.signup(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok", user })).to.be.true;
        });

        it("should return error if user creation fails", async () => {
            hashStub.resolves(hashedPassword);
            createStub.rejects(new Error("User creation failed"));
            await userController.signup(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "error",
                    error: "User creation failed",
                })
            ).to.be.true;
        });
    });

    describe("Login", () => {
        it("should return error for invalid email", async () => {
            findOneStub.resolves(null);
            await userController.login(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({ status: "error", error: "Invalid Email" })
            ).to.be.true;
        });

        it("should return error for invalid password", async () => {
            findOneStub.resolves({
                email: "valid@example.com",
                password: "wrongPassword",
            });
            compareStub.resolves(false);
            await userController.login(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "error",
                    error: "Invalid Password",
                })
            ).to.be.true;
        });

        it("should return token for valid credentials", async () => {
            findOneStub.resolves({
                name: "Test User",
                email: "valid@example.com",
                password:
                    "$2a$10$i2jCh1uiph97eYkKRx9ayeFkmP3wE32lzOy5Hf.6/h6OiO2zWlBGC",
            });
            compareStub.resolves(true);
            signStub.returns("fakeToken");
            await userController.login(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "ok",
                    user: "fakeToken",
                    name: "Test User",
                })
            ).to.be.true;
        });
    });

    describe("Get User", () => {
        const hashedPassword =
            "$2a$10$i2jCh1uiph97eYkKRx9ayeFkmP3wE32lzOy5Hf.6/h6OiO2zWlBGC";
        const user = {
            name: "Test User",
            email: "test@example.com",
            password: hashedPassword,
        };
        it("should return user if found", async () => {
            findOneStub.resolves(user);
            await userController.getUser(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ ok: true, user })).to.be.true;
        });

        it("should return false if user not found", async () => {
            findOneStub.resolves(null);
            await userController.getUser(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ ok: false })).to.be.true;
        });
    });

    describe("Get Users", () => {
        const users = [
            { name: "User 1", email: "user1@example.com" },
            { name: "User 2", email: "user2@example.com" },
        ];
        it("should return users if found", async () => {
            findStub.resolves(users);
            await userController.getUsers(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ ok: true, users })).to.be.true;
        });

        it("should return false if no users found", async () => {
            findStub.resolves([]);
            await userController.getUsers(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ ok: false })).to.be.true;
        });
    });

    describe("Invite", () => {
        const users = [
            { name: "User 1", email: "user1@example.com" },
            { name: "User 2", email: "user2@example.com" },
        ];

        it("should return users if found", async () => {
            aggregateStub.resolves(users);
            await userController.invite(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok", user: users })).to.be
                .true;
        });

        it("should return 500 status and error message if an error occurs", async () => {
            const errorMessage = "An error occurred";
            aggregateStub.rejects(new Error(errorMessage));
            await userController.invite(req, res);
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith({ message: errorMessage })).to.be
                .true;
        });
    });
});
