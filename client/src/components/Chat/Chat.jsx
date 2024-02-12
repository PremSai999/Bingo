import React, { useEffect, useState } from 'react';
// import { useSocket } from '../../context/SocketContext';
import './Chat.css'; 
let x = 0;
const Chat = (props) => {

    // const socket = useSocket();
    const {socket} = props;
    const name = sessionStorage.getItem('name')
    const room = sessionStorage.getItem('room')
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [join, setJoin] = useState(false)

    useEffect(()=>{
        if(socket){
            console.log('gg')
            socket.emit('create-chat',room)
            socket.on('join-chat',(room)=>{
                setJoin(true)
            })
        }
    },[socket])
    // useEffect(()=>{
    //     console.log("gg",x)
    //     x++;

    // },[])

    const sendMessage = () => {
        if(socket){
            const newMessage = {
                sender: 'You',
                text: message,
                is_you: true,
            };
            setMessages([...messages, newMessage]);
            setMessage('');
            socket.emit('sendMsg',{message,room})
            socket.on("receiveMsg",(message)=>{
                console.log("came")
                const newMessage = {
                    sender: name,
                    text: message,
                    is_you: false,
                };
                setMessages([...messages, newMessage]);
            })
        }
    };
  return (
    <div className="chat-app">
    <h2 className='chat-title'>Room Chat</h2>
    {socket && join?<ul className="chat-messages">
      {messages.map((msg, index) => (
        <li key={index} className={msg.is_you ? 'message right' : 'message left'}>
          <span className="sender">{msg.sender}:</span>
          <span className="text">{msg.text}</span>
        </li>
      ))}
    </ul>:<p>Chat Loading</p>}
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
  );
};

export default Chat;
