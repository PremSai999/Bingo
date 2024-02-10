import React, { useEffect } from 'react'
import { MdAccountCircle } from 'react-icons/md'; 
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar({protect}) {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        console.log(protect,token)
        if (!protect){
          if(!token)
          window.location.pathname==='/signup' ? navigate('/signup') :  navigate('/login')
          else
              navigate('/')
        }
        else{
          if(!token)
            navigate('/login')
        }
        
    },[protect,navigate])

    return (
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-title">Bingo</div>
            <div className="profile-info">
              <MdAccountCircle className="profile-icon" />
              {
                window.location.pathname==='/login'?<a href='/signup'>Signup</a>:
                (window.location.pathname==='/signup'?<a href='/login'>Login</a>:
                <a className="username" href='/profile'>{sessionStorage.getItem('name')}</a>)
              }
              
            </div>
          </div>
        </nav>
      );
}

export default Navbar