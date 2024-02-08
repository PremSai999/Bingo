const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Room = require('./models/room.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const port = 4000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://pr3msai:pr3msai@cluster0.434n7gg.mongodb.net/?retryWrites=true&w=majority')

const server = http.createServer(app); 
const io = socketIo(server, {
	cors: {
	  origin: 'http://localhost:3000',
	  methods: ['GET', 'POST'],
	  credentials: true
	}
  });

io.on('connection', (socket) => {
    console.log('New client connected');
	socket.on('join-room',(room)=>{
		socket.join(room);
		socket.to(room).emit('getRoom',room)
	}
	)
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email or Username' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token, name:user.name })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.post('/isUnique', async (req, res)=>{
	const room = await Room.findOne({
		id : req.body.room,
	})
	if (!room) {
		console.log(req.body)
		const data = await Room.create({
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

})

app.post('/checkRoom', async (req, res)=>{
	const room = await Room.findOne({
		id : req.body.roomId,
	})
	if (room) {
		return res.json({ status: 'ok', full:room.totalPlayers===room.players.length})
	}
	else{
		return res.json({ status: 'error'})
	}

})

app.post('/updatePlayer',async (req, res)=>{
	const room = await Room.updateOne({id : req.body.roomId},
	{ $addToSet: { players: req.body.name }})
	if (room) {
		return res.json({ status: 'ok'})
	}
	else{
		return res.json({ status: 'error'})
	}
})

app.post('/updateReady', async (req, res)=>{
	const room = await Room.updateOne({
		id : req.body.roomId,
	},{$inc : {readyCount:1}})
	if (room) {
		return res.json({ status: 'ok', full:room.totalPlayers===room?.players?.length})
	}
	else{
		return res.json({ status: 'error'})
	}

})

app.post('/getPlayers', async (req, res)=>{
	const room = await Room.findOne({
		id : req.body.room,
	})
	if (room) {
		return res.json({ status: 'ok', players:room.players, full:room.totalPlayers===room?.players?.length})
	}
	else{
		return res.json({ status: 'error'})
	}

})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
