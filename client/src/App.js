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

function App() {
  
  

  const protect = window.location.pathname==='/signup'|| window.location.pathname=== '/login'?false:true;

  return (
    <>
    <Router>
    <Navbar protect={protect} />
      <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/join" element={<Join/>} />
          <Route path="/fill" element={<FillMatrix/>} />
          <Route path="/game" element={<Game/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
