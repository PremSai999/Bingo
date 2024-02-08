import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BingoContext } from '../../context/BingoContext';

function Join() {
  const {roomId, setRoomId} = useContext(BingoContext);
  const navigate = useNavigate();

  const joinRoom = async ()=>{

    const res = await fetch("http://localhost:4000/checkRoom",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId,
      }),
    })
    const data = await res.json();
    if(data.status==='ok'){
      if(data.full){
        alert("Room is full");
        return;
      }
      sessionStorage.setItem("room",roomId)
      const res1 = await fetch("http://localhost:4000/updatePlayer",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          name:sessionStorage.getItem("name"),
        }),
        })
      const data1 = await res1.json()
      if(data1.status==='ok')
        navigate('/fill');
    }
    else{
      console.log(data.status)
      alert('Wrong Room')
    }
    
  }

  useEffect(()=>{
    const room= sessionStorage.getItem('room');
    console.log('refresh')
    if (room) {
        setRoomId(room);
    }
}, [setRoomId]);

  return (
    <div>
      <h1>Enter room code</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  )
}

export default Join