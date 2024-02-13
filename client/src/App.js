import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Index from './components/Index/Index';
import FillMatrix from './components/FillMatrix/FillMatrix';
import Game from './components/Game/Game';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Join from './components/Join/Join';
import TempGame from './components/Game/TempGame';
import Profile from './components/Profile/Profile';
import Chat from './components/Chat/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const protect = window.location.pathname==='/signup'|| window.location.pathname=== '/login'?false:true;

  return (
    <>
    <Router>
    <Navbar protect={protect} />
    <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false}/>  
      <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/join" element={<Join/>} />
          <Route path="/fill" element={<FillMatrix/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path='/chat' element={<Chat/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
