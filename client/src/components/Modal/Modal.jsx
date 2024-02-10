import React from 'react'
import './Modal.css'
import { useNavigate } from 'react-router-dom'

function Modal({ winner }) {
    const navigate = useNavigate();
    
    const onClose = ()=>{
        navigate('/')
    }

    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Winner</h2>
            <p>{winner} has won the game!</p>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
    );
}

export default Modal