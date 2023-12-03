import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jwtDecode } from 'jwt-decode';
import logo from '../../assets/images/Logo.png';
import './userLog.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import {  Modal } from 'antd';
import { UserOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const avatars = require.context('../../assets/images/avatars', false, /\.(png|jpe?g|svg)$/);

const UserLog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userDocument, setUserDocument] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Perfil');
  const [userData, setUserData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showDeactivateAlert, setShowDeactivateAlert] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const handleImageClick = () => {
    const userRole = jwtDecode(token)?.role;
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/userDash');
    }
  };

  const handleCancelAccount = async () => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas cancelar tu cuenta?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      async onOk() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error('No se encontró el token de acceso.');
            return;
          }

          await handleDeactivateAccount(token);
        } catch (error) {
          console.error('Error al cancelar la cuenta:', error.message);
        }
      },
      onCancel() {
        console.log('Operación de cancelación de cuenta cancelada');
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          setUserId(decodedToken?.user_id);
          setUserDocument(decodedToken?.document);

          const response = await axios.get('http://localhost:3001/api/v1/user/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUserData(response.data[0]);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    if (redirecting && !showDeactivateAlert) {
      console.log('Redirección completada');
    }
  }, [redirecting, showDeactivateAlert]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const getContainerWidth = () => {
    if (window.innerWidth <= 650) {
      return menuVisible ? '10%' : '0%';
    } else {
      return menuVisible ? '15%' : '5%';
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      const response = await axios.patch(
        'http://localhost:3001/api/v1/user/deactivate',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setOpenDialog(false);
        setShowDeactivateAlert(true);
        setTimeout(() => {
          setShowDeactivateAlert(false);
          setRedirecting(true);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Error al desactivar la cuenta:', error);
      if (error.response) {
        console.log('Error de respuesta:', error.response.data);
      } else if (error.request) {
        console.log('Error de solicitud:', error.request);
      } else {
        console.log('Error general:', error.message);
      }
    }
  };

  const menuOptions = [
    { label: 'Perfil', icon: <AccountCircleIcon /> },
    { label: 'Config.', icon: <BuildCircleIcon /> }
  ];


  return (
    <div className="user-log-container">
    <div className="menu-user">
      <a onClick={() => navigate('/')}>
        <img className="uamLogo" src={logo} alt="Logo Full House Shoes" style={{ cursor: 'pointer' }}/>
      </a>
      <button className="toggle-button" onClick={toggleMenu}>
        {menuVisible ? <MenuOpenIcon /> : <MenuIcon/>}
      </button>
        <div className="user-section" onClick={handleImageClick}>
          <img
            className="avatar-user"
            src={
              avatars.keys().includes(`./${userDocument}.png`)
                ? avatars(`./${userDocument}.png`)
                : require('../../assets/images/Frank.png')
            }
            alt="Imagen de usuario"
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="button-logout">
          <Button  onClick={handleLogout}><LogoutIcon /></Button>
        </div>
    </div>

    <div className='content-container'>
      <div className='slide-container' style={{ width: getContainerWidth() }}>
        {(window.innerWidth > 650 || menuVisible) && ( 
          <div className="icon-container">
            {menuOptions.map((option) => (
              <div className={`icon ${selectedOption === option.label ? 'selected' : ''}`} key={option.label} onClick={() => handleMenuClick(option.label)}>
                {option.icon}
                {menuVisible && <span className='menu-option-text'>{option.label}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

        <div className='content-user'>
          {selectedOption === 'Perfil' && (
            <div className='data-user'>
            <h1>¡ Bienvenido, {userData?.firstname} !</h1>

            <img
              className="avatar-profile"
              src={
                avatars.keys().includes(`./${userDocument}.png`)
                  ? avatars(`./${userDocument}.png`)
                  : require('../../assets/images/Frank.png')
              }
              alt="Imagen de usuario"
            />

            <h1>Información del usuario </h1>


            <table>
              <tbody>
                <tr>
                  <td>Correo Electrónico:</td>
                  <td>{userData?.email}</td>
                </tr>
                <tr>
                  <td>No. Documento:</td>
                  <td>{userData?.document}</td>
                </tr>
                <tr>
                  <td>Pais:</td>
                  <td>{userData?.country}</td>
                </tr>
              </tbody>
            </table>

            


            </div>
          )}
          {selectedOption === 'Config.' && (
            <div className='configuration-panel'>
              <h2>Configuración de la cuenta</h2>
              <h4>Aqui puedes acceder a la configuracion de tu cuenta</h4>
              <Button  className="password-button" variant="contained" onClick={handleCancelAccount}>
                Cambiar contraseña
              </Button>
              <Button className="deactive-button"  variant="contained" onClick={handleCancelAccount}>
                Cancelar cuenta
              </Button>
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLog;
