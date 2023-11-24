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
import './userLog.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const avatars = require.context('../../assets/images/avatars', false, /\.(png|jpe?g|svg)$/);

const UserLog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Perfil');
  const [userData, setUserData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showDeactivateAlert, setShowDeactivateAlert] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [userDocument, setUserDocument] = useState(null);

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
      // Realizar acciones necesarias después de la redirección, si es necesario
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
    { label: 'Configuración', icon: <BuildCircleIcon /> }
  ];


  return (
    <div className="user-log-container">
    <div className="menu-user">
      <button className="toggle-button" onClick={toggleMenu}>
        {menuVisible ? <MenuOpenIcon /> : <MenuIcon/>}
      </button>

      {userId ? (
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
      ) : (
        <Button className="button-login" onClick={() => navigate('/login')}>
          Iniciar sesión
        </Button>
      )}
    </div>

    <div className='content-container'>
      <div className='slide-container' style={{ width: getContainerWidth() }}>
        {(window.innerWidth > 650 || menuVisible) && ( // Renderiza los iconos si la pantalla es lo suficientemente grande o si el menú está activo
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
            <Button className="button-logout" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
          {selectedOption === 'Configuración' && (
            <div className='configuration-panel'>
              <Button onClick={handleOpenDialog}>
                Cancelar cuenta
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"¿Seguro que quieres cancelar tu cuenta?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Esta acción no se puede deshacer. ¿Estás seguro de cancelar la cuenta?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancelar</Button>
                  <Button onClick={handleDeactivateAccount} autoFocus>
                    Sí, estoy seguro
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={showDeactivateAlert}
                onClose={() => setShowDeactivateAlert(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Cuenta desactivada correctamente"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Tu cuenta ha sido desactivada. Serás redirigido en breve.
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default UserLog;
