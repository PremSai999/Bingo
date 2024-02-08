import React, { useContext, useEffect, useState } from 'react'
import { BingoContext } from '../../context/BingoContext';
import { useSocket } from '../../context/SocketContext';
import isBingo from '../../utils/validate';
import './Game.css'
import io from 'socket.io-client';

function Game() {

    const SOCKET_SERVER_URL = 'http://localhost:4000';
    const [socket, setSocket] = useState(null);
    
    const soc = useSocket();

    const {matrix, setMatrix} = useContext(BingoContext);
    const [turn, setTurn] = useState(0);
    const [players, setPlayers] = useState(null)
    const [progress, setProgress]  = useState(0);
    const [started, setStarted] = useState(false)

    const room = sessionStorage.getItem('room');
    
    
    useEffect(() => {
        console.log("ff")
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);
        newSocket.on('connect', () => {
          console.log('Connected to server');
        });
    
        newSocket.emit('join-room',room)
        newSocket.on('getRoom',(room)=>console.log(room))




        newSocket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
        getUsers()
        setTurn(sessionStorage.getItem('turn'))

        return () => {
          newSocket.disconnect();
        };
      }, []);

    
    const getUsers = async ()=>{
        const res = await fetch("http://localhost:4000/getPlayers",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        room,
        }),
        })
        const data = await res.json();
        console.log(data)
        if(data.status==='ok'){
            console.log(data.players)
            setPlayers(data.players)
            setStarted(data.full)
    }}

    useEffect(()=>{
        const storedMatrix = JSON.parse(sessionStorage.getItem('matrix'));
        console.log('refresh')
        if (storedMatrix) {
            setMatrix(storedMatrix);
            setProgress(isBingo(storedMatrix));
        }
    }, [setMatrix]);
    

    const clickedButton = (r,c)=>{
        if(players) console.log(players)
        if(started && players && players[turn]===sessionStorage.getItem("name")){
            const newMatrix = [...matrix];
            newMatrix[r][c].strike = true;
            setMatrix(newMatrix);
            sessionStorage.setItem('matrix', JSON.stringify(matrix));
            setProgress(isBingo(matrix))
            setTurn(turn=>((turn+1)%players.length))
            sessionStorage.setItem('turn', turn);
        }
    }
    
    if (!soc) {
        return <div>Loading...</div>;
      }
      console.log(soc)
  return (
    <>  
        <div className="bingo-container"style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: 'white' }}>
        <span style={{ color: progress > 0 ? 'red' : 'green' }}>B</span>
        <span style={{ color: progress > 1 ? 'red' : 'green' }}>I</span>
        <span style={{ color: progress > 2 ? 'red' : 'green' }}>N</span>
        <span style={{ color: progress > 3 ? 'red' : 'green' }}>G</span>
        <span style={{ color: progress > 4 ? 'red' : 'green' }}>O</span>
        </div>
        {started?(players && players[turn]===sessionStorage.getItem('name') && <p>Its your turn</p>):<p>Wait till others join</p>}
        <div className="matrix-container">
            {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className={"matrix-row"}>
                {row.map((number, colIndex) => (
                <button
                    key={colIndex}
                    className={`matrix-button ${number && number.strike ? 'strike':""}`}
                    onClick={()=>clickedButton(rowIndex,colIndex)}
                >
                    {number && number.value}
                </button>
                ))}
            </div>
            ))}
        </div>
        {progress>4 && <h1>You've won the match</h1>}
    </>
  )
}

export default Game