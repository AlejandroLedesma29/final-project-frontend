import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminMenu.scss';
import logo from '../../../assets/images/Logo.png';
import Button from '@mui/material/Button';
import { jwtDecode } from 'jwt-decode';

const avatars = require.context('../../../assets/images/avatars', false, /\.(png|jpe?g|svg)$/);

const AdminMenu = () => {
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


  return (
    <div className="menu">
      <a onClick={() => navigate('/')}>
        <img className="uamLogo" src={logo} alt="Logo Full House Shoes" style={{ cursor: 'pointer' }} />
      </a>
      <button id="menu-toggle" className="menu-toggle">
        ☰
      </button>
      <ul id="menu-list">
      </ul>
      <div className="user-section">
        <a onClick={() => navigate('/admin')}>
        <img  className="avatar-admin" src={avatars.keys().includes(`./${userDocument}.png`) ? avatars(`./${userDocument}.png`) : require('../../../assets/images/Frank.png')} alt="Imagen de usuario" style={{ cursor: 'pointer' }}/>
        </a>
      </div>
    </div>
  );
};

export default AdminMenu;
