const Game = require('../models/game.model');

exports.isUnique = async (req, res)=>{
	const room = await Game.findOne({
		id : req.body.room,
	})
	if (!room) {
		console.log(req.body)
		const data = await Game.create({
			id : req.body.room,
			leader : req.body.name,
			players : [req.body.name],
			readyCount : 0,
			totalPlayers: req.body.totalPlayers
		})
		return res.json({ status: 'ok', data})
	}
	else{
		return res.json({ status: 'error'})
	}
}

exports.checkRoom = async (req, res)=>{
	const room = await Game.findOne({
		id : req.body.roomId,
	})
	if (room) {
		return res.json({ status: 'ok', full:room.totalPlayers===room.players.length})
	}
	else{
		return res.json({ status: 'error'})
	}

}

exports.updatePlayer = async (req, res)=>{
	const room = await Game.updateOne({id : req.body.roomId},
	{ $addToSet: { players: req.body.name }})
	if (room) {
		return res.json({ status: 'ok'})
	}
	else{
		return res.json({ status: 'error'})
	}
}

exports.updateReady = async (req, res)=>{
	const room = await Game.updateOne({
		id : req.body.roomId,
	},{$inc : {readyCount:1}})
	if (room) {
		return res.json({ status: 'ok', full:room.totalPlayers===room?.players?.length})
	}
	else{
		return res.json({ status: 'error'})
	}

}

exports.getPlayers = async (req, res)=>{
	const room = await Game.findOne({
		id : req.body.room,
	})
	if (room) {
		return res.json({ status: 'ok', players:room.players, full:room.readyCount>=room.totalPlayers})
	}
	else{
		return res.json({ status: 'error'})
	}

}

exports.getGameStats = async (req, res)=>{
	const gamesPlayed = await Game.aggregate([
						{
						$match: {
							players: req.body.name
						}
						},
						{
						$group: {
							_id: null,
							totalGamesPlayed: { $sum: 1 }
						}
						}
					])
	const gamesWon = await Game.aggregate([
					{
					$match: {
						players: req.body.name, 
						winner: req.body.name 
					}
					},
					{
					$group: {
						_id: null,
						totalGamesWon: { $sum: 1 }
					}
					}
				])

	if(gamesPlayed.length!==0){
		if(gamesWon.length!==0){
			res.json({gamesPlayed:gamesPlayed[0].totalGamesPlayed,
					  gamesWon:gamesWon[0].totalGamesWon})
		}
		else{
			res.json({gamesPlayed:gamesPlayed[0].totalGamesPlayed,
				gamesWon:0})
		}
	}
	else{
		res.json({gamesPlayed:0,gamesWon:0});
	}
}