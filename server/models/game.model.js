const mongoose = require('mongoose')

const Game = new mongoose.Schema(
	{
    id: { type: String, required: true},
    leader: { type: String, required: true },
    players: { type: [String], required: true },
	readyCount : {type : Number, required:true},
    totalPlayers: { type: Number, required: true },
    bingoSize : {type : Number, required:true},
    winner : {type: String, default:null}
},
	{ collection: 'game-data' }
)

const model = mongoose.model('gameData', Game)

module.exports = model 