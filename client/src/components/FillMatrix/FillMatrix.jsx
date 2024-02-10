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
    const temp = async ()=>{
        const matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]
        const updatedMatrix = matrix.map(row => 
            row.map(ele => ({ value: ele, strike: false }))
        )
        await fetch("http://localhost:4000/updateReady",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                roomId,
                }),
                }) 
        setMatrix(updatedMatrix)
        // sessionStorage.setItem('matrix',JSON.stringify(updatedMatrix))
        navigate('/game')
    }
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
            setMatrix(updatedMatrix)
            // sessionStorage.setItem('matrix',JSON.stringify(matrix))
            // sessionStorage.setItem('turn',0)
            // sessionStorage.setItem('players',null)
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
            <button onClick={temp}>temp</button>
        </div>
        
    )
}

export default FillMatrix