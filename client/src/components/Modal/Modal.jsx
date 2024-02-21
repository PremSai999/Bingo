import React, { useEffect } from 'react'
import './Modal.css'
import { useNavigate } from 'react-router-dom'
import { sendWinnerMail } from '../../utils/gameFuncs';

function Modal({ winner }) {
    const navigate = useNavigate();
    const name = sessionStorage.getItem('name');
    
    const onClose = ()=>{
        navigate('/')
        window.location.reload()
    }
    useEffect(()=>{
      sessionStorage.removeItem("matrix")
      if(winner===name){
        sendWinnerMail(name).then((res)=>{
          console.log(res)
        }).catch((err)=>console.error(err))
      }
    },[])
    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Winner</h2>
            <p>{winner} has won the game!</p>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
    );
}

export default Modal