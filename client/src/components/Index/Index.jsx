import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BingoContext } from '../../context/BingoContext';
import { generateRoom } from '../../utils/generateRoom';
import { isUnique } from '../../utils/gameFuncs';
import './Index.css'

function Index() {
  const {setRoomId} = useContext(BingoContext);
  const [numPlayers, setNumPlayers] = useState(2);
  const name = sessionStorage.getItem('name');
  const navigate = useNavigate();

  const create = async ()=>{
      while (true){
      const room = generateRoom();
      const data = await isUnique(room, numPlayers, name)
      if(data){
        sessionStorage.setItem("room",room);
        setRoomId(room);
        break;
      }
      // const res = await fetch("http://localhost:4000/isUnique",{
      //                   method: 'POST',
      //                   headers: {
      //                     'Content-Type': 'application/json',
      //                   },
      //                   body: JSON.stringify({
      //                     room,
      //                     name:sessionStorage.getItem("name"),
      //                     totalPlayers:numPlayers
      //                   }),
      //                 })
      // const data = await res.json()
      // console.log(data.status)
      // if (data.status==="ok"){
      //   sessionStorage.setItem("room",room);
      //   setRoomId(room);
      //   break;
      // }
    }
    navigate('/fill')

  }
  const joinRoom = ()=>{
    navigate('/join');
  }
  return (
    <div className="player-selection-container">
      <h2>Select the number of players:</h2>
    <div className="player-selection">
      <select value={numPlayers} onChange={(e)=>setNumPlayers(parseInt(e.target.value))}>
        <option value={2}>2 Players</option>
        <option value={3}>3 Players</option>
        <option value={4}>4 Players</option>
      </select>
    </div>
    <div className="action-buttons">
      <button onClick={create}>Create Game</button>
    </div>
    <div className="or">OR</div>
    <div className="action-buttons">
      <button onClick={joinRoom}>Join Game</button>
    </div>
  </div>
  )
}

export default Index