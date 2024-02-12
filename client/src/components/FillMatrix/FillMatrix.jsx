import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BingoContext } from '../../context/BingoContext';
import { updateReady } from '../../utils/gameFuncs';
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
        const data = await updateReady(roomId)
        if(data.status==='ok'){
            setMatrix(updatedMatrix)
            navigate('/game')
        }
    }
    const startGame = async()=>{
        if(count===26){
            const data = await updateReady(roomId)
            if(data.status==='ok'){
                setMatrix(matrix)
                navigate('/game')
            }
        }
    }

    return (

        <div className="matrix-container">
            <h1>The room you've joined is {roomId}</h1>
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
            <button onClick={startGame}>Ready</button>
            <button onClick={temp}>temp</button>
        </div>
    )
}

export default FillMatrix