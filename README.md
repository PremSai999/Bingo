# Bingo Application

The Bingo Application is a real-time multiplayer game where users can create or join rooms, play Bingo.
## Technologies Used

- **Frontend:** React
- **Backend:** Node.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.io

## Features

1. **Create Room:**
   - Users can create a new Bingo room.
   - Set room preferences, such as the size of the Bingo board.

2. **Join Room:**
   - Users can join an existing room using a unique room code.

3. **Gameplay:**
   - Users can mark numbers on their Bingo board during their turn.
   - Real-time updates are sent to all players when a number is marked.

4. **Winning Notification:**
   - When a user completes a Bingo pattern, a notification is sent to all players.
   - The game ends, and players are informed about the winner.

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
