import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.scss';
import logo from '../../assets/images/Logo.png';
import Button from '@mui/material/Button';
import { jwtDecode } from 'jwt-decode';


const avatars = require.context('../../assets/images/avatars', false, /\.(png|jpe?g|svg)$/);


const MenuComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null);
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken?.user_id);
      setUserDocument(decodedToken?.document);
    }
  }, [token]);

  const handleImageClick = () => {
    const userRole = jwtDecode(token)?.role;
    if (userRole === 'admin') {
      navigate('/admin'); 
    } else {
      navigate('/userDash'); 
    }
  };

  return (
    <div className="menu">
      <a onClick={() => navigate('/')}>
        <img className="uamLogo" src={logo} alt="Logo Full House Shoes" style={{ cursor: 'pointer' }}/>
      </a>
      <button id="menu-toggle" className="menu-toggle">
        ☰
      </button>
      <ul id="menu-list">
        <li>
          <a className= "links-menu" href="#home">Destacados</a>
        </li>
        <li>
          <a className= "links-menu"  href="#news">Novedades</a>
        </li>
        <li>
          <a className= "links-menu"  href="#trends">Tendencia</a>
        </li>
      </ul>
      {userId ? (
        <div className="user-section">
          <a onClick={handleImageClick}>
            <img  className="avatar-user" src={avatars.keys().includes(`./${userDocument}.png`) ? avatars(`./${userDocument}.png`) : require('../../assets/images/Frank.png')} alt="Imagen de usuario" style={{ cursor: 'pointer' }}/>
          </a>
        </div>
      ) : (
        <Button className="button-login" onClick={() => navigate('/login')}>
          Iniciar sesión
        </Button>
      )}
    </div>
  );
};

export default MenuComponent;
