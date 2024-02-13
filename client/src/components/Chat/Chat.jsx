import React, { useEffect, useRef, useState } from 'react';
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
    const chatMessagesRef = useRef(null);

    useEffect(()=>{
      if(socket){
        socket.on("receiveMsg",(data)=>{
          setMessages([...messages, {
              sender: data.name,
              text: data.message,
              is_you: false,
          }]);
          console.log("came",messages)
      })
      }
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    },[socket,messages])

    const sendMessage = () => {
        if(socket){
            const newMessage = {
                sender: 'You',
                text: message,
                is_you: true,
            };
            setMessages([...messages, {
                sender: 'You',
                text: message,
                is_you: true,
            }]);
            setMessage('');
            socket.emit('sendMsg',{message,room,name})
        }
    };
  return (
    <div className="chat-app">
    <h2 className='chat-title'>Room Chat</h2>
    {socket ? <ul ref={chatMessagesRef} className="chat-messages">
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
