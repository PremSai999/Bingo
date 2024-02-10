import React, { useContext, useEffect, useState } from 'react'
import { BingoContext } from '../../context/BingoContext';
import { useSocket } from '../../context/SocketContext';
import isBingo from '../../utils/validate';
import { findIndices } from '../../utils/findIndices';
import { checkStart } from '../../utils/gameFuncs';
import './Game.css'
// import io from 'socket.io-client';
let x = 0;
function Game() {

    // const SOCKET_SERVER_URL = 'http://localhost:4000';
    // const [socket, setSocket] = useState(null);
    
    const socket = useSocket();

    const {matrix, setMatrix} = useContext(BingoContext);
    const [turn, setTurn] = useState(0);
    const [progress, setProgress]  = useState(0);
    const [started, setStarted] = useState(false)
    // let players = JSON.parse(sessionStorage.getItem('players'))
    const [players, setPlayers] = useState([])
    const [called, setCalled] = useState(false)
    const room = sessionStorage.getItem('room');


    useEffect(()=>{
        if(socket && !started){
            console.log(socket)
                // debugger;
            socket.emit('join-room',room)
            
            socket.on('getRoom',(room)=>{
                console.log("Joined"+room);
                checkStart(room).then(res=>{
                    if(res){
                        console.log(res.full,res.players,'bnm')
                        
                        sessionStorage.setItem('players',JSON.stringify(res.players))
                        // players = JSON.parse(sessionStorage.getItem('players'))
                        setStarted(res.full)
                        setPlayers(res.players)
                    }
                })
                // setTurn(parseInt(sessionStorage.getItem('turn')))
            })
            
            }
            // socket.on("nice",(data)=>console.log(data))
    },[socket,started])

    useEffect(() => {
        console.log('check')
        if (players.length>1 && !called){
            console.log(players,"iop")
            socket.on('clicked',(val)=>{
                // debugger;
                const data = findIndices(matrix,val)
                console.log(data)
                if(data){
                    x++;
                    console.log(x)
                    const {r,c} = data
                    console.log('came to updates',players)
                    const newMatrix = [...matrix];
                    newMatrix[r][c].strike = true;
                    setMatrix(newMatrix);
                    sessionStorage.setItem('matrix', JSON.stringify(matrix));
                    setProgress(isBingo(matrix))
                    setTurn(turn=>(turn+1)%players.length)
                    console.log(turn,players.length)
                    console.log("gg")
            }})
            setCalled(true)
        }
        
    }, [players,called])
    // useEffect(()=>{
    //     if(started){
    //         x++
    //         console.log("why",x)
    //         checkStart(room).then(res=>{
    //             if(res){
    //                 sessionStorage.setItem('players',JSON.stringify(res.players))
    //                 console.log("setted")
    //             }
    //         })
    //     }
    // },[started])
    
    

    useEffect(()=>{
        const storedMatrix = JSON.parse(sessionStorage.getItem('matrix'));
        console.log('matrix refresh')
        if (storedMatrix) {
            setMatrix(storedMatrix);
            setProgress(isBingo(storedMatrix));
        }
    }, [setMatrix]);
    

    const clickedButton = (r,c)=>{
        console.log("gg",players)
        if(socket){
            socket.emit('check',{room,val:"coming"})
        }
        if(socket && players && players[turn]===sessionStorage.getItem('name')){
            // updateThings(r,c)
            console.log("hjk")
            socket.emit('click',{val:matrix[r][c].value,room})
        }
    }
    
    // const updateThings= (r,c)=>{
    //     console.log('came to updates',players)
    //     const newMatrix = [...matrix];
    //     newMatrix[r][c].strike = true;
    //     setMatrix(newMatrix);
    //     sessionStorage.setItem('matrix', JSON.stringify(matrix));
    //     setProgress(isBingo(matrix))
    //     let newTurn = turn
    //     newTurn = (newTurn+1)%players.length
    //     console.log(newTurn,"po")
    //     setTurn(newTurn)
    //     // sessionStorage.setItem('turn', newTurn);
    // }

    return (
          (socket && started && players)?
            <div>  
                <div className="bingo-container"style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: 'white' }}>
                <span style={{ color: progress > 0 ? 'red' : 'green' }}>B</span>
                <span style={{ color: progress > 1 ? 'red' : 'green' }}>I</span>
                <span style={{ color: progress > 2 ? 'red' : 'green' }}>N</span>
                <span style={{ color: progress > 3 ? 'red' : 'green' }}>G</span>
                <span style={{ color: progress > 4 ? 'red' : 'green' }}>O</span>
                </div>
                {started?(players && players[turn]===sessionStorage.getItem('name') ?<p>Its your turn</p>:players):<p>Wait till others join</p>}
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
                {/* <button onClick={()=>setPlayers(x=>x.push("100"))}>increase</button> */}
            </div>
            :
            <div>
                Game Loading.....
            </div>
    )
}

export default Game