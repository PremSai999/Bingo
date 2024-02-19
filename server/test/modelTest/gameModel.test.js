const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
 
var Game = require('../../models/game.model');
 
describe('Testing Game model', () => {
    let sampleGameVal;
    beforeEach(() => {
      sampleGameVal = {
        id: "randomString",
        leader: "randomString",
        players: ["randomString"],
        readyCount : 1234567890,
        totalPlayers: 1234567890,
      };
    });
    it('it should throw an error due to missing fields', async () => {
        let game = new Game();
        try {
          await game.validate();
          throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
          expect(err.errors.id).to.exist;
          expect(err.errors.leader).to.exist;
          expect(err.errors.readyCount).to.exist;
          expect(err.errors.totalPlayers).to.exist;
        }
      });
 
      it('it should create the item successfully with correct parameters',(done) => {
        let game = new Game(sampleGameVal);
        game.validate().then(()=>{done();}).catch((err)=>{throw new Error('⚠️ Unexpected failure!')})
      });
    
  }) 