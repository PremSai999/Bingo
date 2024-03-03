const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute');
const gameRoute = require('./routes/gameRoute');
const mailRoute = require('./routes/mailRoute');
const s3Route = require('./routes/s3Route');
const Game = require('./models/game.model');
const port =process.env.PORT;
const mongo_url =  process.env.MONGO_URL

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use('/api',userRoute)
app.use('/',gameRoute)
app.use('/mail',mailRoute)
app.use('/s3',s3Route)

mongoose.connect(mongo_url).then(()=>{console.log("connected")})

const server = http.createServer(app); 
const io = socketIo(server, {
	cors: {
	  origin: ['http://localhost:3000',"https://bingo-chi-tan.vercel.app"],
	  methods: ['GET', 'POST'],
	  credentials: true
	}
  });

io.on('connection', (socket) => {
    console.log('New client connected');
	socket.on('join-room',(room)=>{
		console.log("joined")
		socket.join(room);
		io.to(room).emit('getRoom',room)
	}
	)
	socket.on('click',(data)=>{
		socket.to(data.room).emit('clicked',data.val)
	})
	socket.on('sendWinner',async (data)=>{
		const res = await Game.updateOne({
			id : data.room,
		},{winner : data.name})
		if(res)
		io.to(data.room).emit('receiveWinner',data.name)
	})

	socket.on('sendMsg',(data)=>{
		console.log("came",data.room,data.message)
		socket.to(data.room).emit('receiveMsg',{name:data.name,message:data.message})
	})
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
	
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = server;
