# Bingo Application

## Description
This is a Bingo application developed using React, Node.js, Express, Socket.io, and MongoDB. It allows 2 to 4 players to create and join rooms, play Bingo, and chat with each other while playing.

## Technologies Used
- **Frontend:** React
  
- **Backend:** Node.js, Express
  
- **Database:** MongoDB
  
- **Real-time Communication:** Socket.io

## Functionalities
- **Room Creation and Joining**: Players can create a new room or join an existing room.

- **Inviting players via mail**: Players can invite their friends through invite section present in application.
  
- **Bingo Gameplay**: Players can play Bingo in real-time.
  
- **Chatting**: Players can chat with each other while playing.
  
- **Statistics**: The application shows player statistics in his profile.

## Socket Events

- **roomCreated:**
  - *Description:* Sent when a new room is created.
    
- **roomJoined:**
  - *Description:* Sent when a user successfully joins a room.
    
- **startGame:**
  - *Description:* Sent to all players when the game starts.
    
- **numberMarked:**
  - *Description:* Sent when a player marks a number on their board.
    
- **bingoWinner:**
  - *Description:* Sent when a player wins the game.

## How to Start Locally
1. Clone the repository:
   
   ```bash
   git clone https://github.com/PremSai999/bingo.git
   ```
2. Navigate to project directory:
   
   ```bash
   cd bingo
   ```
3. Installing client dependencies and starting the client:

   ```bash
   cd client
   npm install
   npm start
   ```
4. Installing server dependencies and starting the server:

   ```bash
   cd server
   npm install
   npm start
   ```
5. Open your browser and navigate to http://localhost:3000 to access the application.
