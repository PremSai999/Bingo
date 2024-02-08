import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BingoContext } from '../../context/BingoContext';
import './FillMatrix.css'

function FillMatrix() {
    const {matrix, setMatrix, roomId, setRoomId} = useContext(BingoContext);
    
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const room = sessionStorage.getItem('room');
        if (room) {
            setRoomId(room);
        }
    },[setRoomId])

    const assignNumber = (row, col) => {
        const newMatrix = [...matrix];
        if (newMatrix[row][col]===null){
            newMatrix[row][col] = {value:count,strike:false};
            setCount(count=>count+1);
            setMatrix(newMatrix);
        }
        console.log(matrix)
    };

    const startGame = async()=>{
        if(count===26){
            await fetch("http://localhost:4000/updateReady",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                roomId,
                }),
                }) 
            sessionStorage.setItem('matrix',JSON.stringify(matrix))
            sessionStorage.setItem('turn',0)
            navigate('/game')
        }
    }

    return (
        <div>
            <h1>The room you've joined is {roomId}</h1>
            <div className="matrix-container">
                {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="matrix-row">
                    {row.map((number, colIndex) => (
                    <button
                        key={colIndex}
                        className="matrix-button"
                        onClick={() => assignNumber(rowIndex, colIndex)}
                    >
                        {number !=null && number.value !== null && number.value}
                    </button>
                    ))}
                </div>
                ))}
            </div>
            <button onClick={startGame}>Ready</button>
        </div>
        
    )
}

export default FillMatrix