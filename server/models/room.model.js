const mongoose = require('mongoose')

const Room = new mongoose.Schema(
	{
    id: { type: String, required: true},
    leader: { type: String, required: true },
    players: { type: [String], required: true },
	readyCount : {type : Number, required:true},
    totalPlayers: { type: Number, required: true }
},
	{ collection: 'game-data' }
)

const model = mongoose.model('roomData', Room)

module.exports = model 