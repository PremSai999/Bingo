import React, { useEffect, useState } from 'react'
import { inviteDetails, sendMailInvite, getUsers } from '../../utils/gameFuncs';
import {toast} from 'react-toastify'
import './Invite.css'

function Invite() {
    const [query, setQuery] = useState('');
    const room = sessionStorage.getItem('room')
    const [players, setPlayers] = useState([]);


    useEffect(()=>{
      getUsers().then((data)=>{
        console.log(data)
        if(data){
          setPlayers(data)
        }
      })
    },[])
    const handleSearch = async () => {
      try {
        const data = await inviteDetails(query)
        console.log(data)
        setPlayers(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    const sendInvite = async(name,email)=>{
        const data = await sendMailInvite(name,email,room)
        if(data){
          toast.success(`Sent invite to ${name}`)
        }
        else{
          toast.error("Error Occured while sending mail")
        }
    }
  
    return (
        <div className="invite-container">
        <h1>Invite Players</h1>
        <input
        className='invite-text'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" onClick={handleSearch}>Search</button>
        <ul className="invite-list">
          {players.map((player) => (
            <li key={player._id}>
              {player.name}
              <button className='invite-button' onClick={()=>{sendInvite(player.name,player.email)}}>Invite</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default Invite