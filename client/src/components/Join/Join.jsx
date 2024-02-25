import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BingoContext } from '../../context/BingoContext';
import { checkRoom, updatePlayer } from '../../utils/gameFuncs';
import './Join.css'

function Join() {
  const {roomId, setRoomId, setBingoSize} = useContext(BingoContext);
  const name = sessionStorage.getItem('name');
  const navigate = useNavigate();

  const joinRoom = async ()=>{
    const data = await checkRoom(roomId);
    if(data.status==='ok'){
      if(data.full){
        alert("Room is full");
        return;
      }
      sessionStorage.setItem("room",roomId);
      setBingoSize(data.bingoSize)
      const data1 = await updatePlayer(roomId,name)
      if(data1.status==='ok')
        navigate('/fill');
    }
    else{
      console.log(data.status)
      alert('Wrong Room')
    }
  }

  // useEffect(()=>{
  //   const room= sessionStorage.getItem('room');
  //   console.log('refresh')
  //   if (room) {
  //       setRoomId(room);
  //   }
  // }, [setRoomId]);

  return (
    <div className='join-container'>
    <div className='join-game'>
      <h1>Enter room code</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="btn" onClick={joinRoom}>Join Room</button>
      </div>
    </div>
    </div>
  )
}

export default Join