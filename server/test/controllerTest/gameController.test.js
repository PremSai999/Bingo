const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const Game = require("../../models/game.model");
const gameController = require("../../controllers/gameController");

describe("Game controller test", () => {
    let findOneStub;
    let createStub;
    let updateOneStub;
    let aggregateStub;
    let req;
    let res;

    beforeEach(() => {
        findOneStub = sinon.stub(Game, "findOne");
        createStub = sinon.stub(Game, "create");
        updateOneStub = sinon.stub(Game, "updateOne");
        aggregateStub = sinon.stub(Game, "aggregate");

        req = {
            body: {
                room: "room1",
                name: "player1",
                totalPlayers: 4,
            },
            params: {
                roomId: "room1",
            },
        };

        res = {
            json: sinon.spy(),
        };
    });

    afterEach(() => {
        findOneStub.restore();
        createStub.restore();
        updateOneStub.restore();
        aggregateStub.restore();
    });

    describe("isUnique", () => {
        const data = {
            id: "room1",
            leader: "player1",
            players: ["player1"],
            readyCount: 0,
            totalPlayers: 4,
        };
        it("should create a new game room if it does not exist", async () => {
            findOneStub.resolves(null);
            createStub.resolves(data);
            await gameController.isUnique(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok", data })).to.be.true;
        });

        it("should return an error if the game room already exists", async () => {
            findOneStub.resolves(data);
            await gameController.isUnique(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.isUnique(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });
    });

    describe("checkRoom", () => {
        it("should return the correct status and full value when the room exists and is not full", async () => {
            findOneStub.resolves({
                id: "room1",
                leader: "player1",
                players: ["player1"],
                readyCount: 0,
                totalPlayers: 4,
                bingoSize: 5
            });
            await gameController.checkRoom(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok", full: false, bingoSize: 5 })).to.be
                .true;
        });

        it("should return the correct status and full value when the room exists and is full", async () => {
            findOneStub.resolves({
                id: "room1",
                leader: "player1",
                players: ["player1", "player2", "player3", "player4"],
                readyCount: 4,
                totalPlayers: 4,
                bingoSize: 5
            });
            await gameController.checkRoom(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok", full: true, bingoSize: 5})).to.be
                .true;
        });

        it("should return an error if the room does not exist", async () => {
            findOneStub.resolves(null);
            await gameController.checkRoom(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.checkRoom(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });
    });

    describe("updatePlayer", () => {
        it("should update the players list correctly when the room exists", async () => {
            updateOneStub.resolves({
                modifiedCount: 1,
            });
            await gameController.updatePlayer(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok" })).to.be.true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.updatePlayer(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });
    });

    describe("updateReady", () => {
        it("should update the ready count correctly when the room exists", async () => {
            updateOneStub.resolves({
                modifiedCount: 1,
            });
            await gameController.updateReady(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "ok" })).to.be.true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.updateReady(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });
    });

    describe("getPlayers", () => {
        it("should return the players list and full to true when room is filled", async () => {
            findOneStub.resolves({
                players: ["player1", "player2"],
                readyCount: 2,
                totalPlayers: 2,
            });
            await gameController.getPlayers(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "ok",
                    players: ["player1", "player2"],
                    full: true,
                })
            ).to.be.true;
        });

        it("should return the players list and full to false when room is not filled", async () => {
            findOneStub.resolves({
                players: ["player1"],
                readyCount: 1,
                totalPlayers: 2,
            });
            await gameController.getPlayers(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(
                res.json.calledWith({
                    status: "ok",
                    players: ["player1"],
                    full: false,
                })
            ).to.be.true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.getPlayers(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ status: "error" })).to.be.true;
        });
    });

    describe("getRoomData", () => {
        it("should return room data if the room exists", async () => {
            findOneStub.resolves({
                id: "random",
                data: "dummyData"
            });
            await gameController.getRoomData(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ ok:true, data:{
                                            id: "random",
                                            data: "dummyData"
                                        } })).to.be.true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.getRoomData(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ ok:false })).to.be.true;
        });
    });

    describe("getGameStats", () => {
        it("should return the correct number of games played and games won when the player has played games", async () => {
            aggregateStub.onFirstCall().resolves([{ totalGamesPlayed: 5 }]);
            aggregateStub.onSecondCall().resolves([{ totalGamesWon: 3 }]);
            await gameController.getGameStats(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ gamesPlayed: 5, gamesWon: 3 })).to.be
                .true;
        });

        it("should return the correct number of games played and 0 games won when player didnt win any games", async () => {
            aggregateStub.onFirstCall().resolves([{ totalGamesPlayed: 5 }]);
            aggregateStub.onSecondCall().resolves([]);
            await gameController.getGameStats(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ gamesPlayed: 5, gamesWon: 0 })).to.be
                .true;
        });

        it("should return 0 for both games played and games won when the player has not played any games", async () => {
            aggregateStub.onFirstCall().resolves([]);
            aggregateStub.onSecondCall().resolves([]);
            await gameController.getGameStats(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ gamesPlayed: 0, gamesWon: 0 })).to.be
                .true;
        });

        it("should handle invalid input gracefully", async () => {
            req.body = {};
            await gameController.getGameStats(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith({ gamesPlayed: 0, gamesWon: 0 })).to.be
                .true;
        });
    });
});