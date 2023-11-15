import React, { useState, useEffect } from "react";
import MenuComponent from "../menu/menu";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jwtDecode } from 'jwt-decode';

const UserLog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken?.user_id);

          const response = await axios.get('http://localhost:3001/api/v1/user/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUserData(response.data[0]);
        }
        else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("refresh");
    navigate('/');
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:3001/api/v1/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        console.log("Cuenta eliminada");
        localStorage.removeItem('token');
        localStorage.removeItem("refresh");
        navigate('/');
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };
  

  return (
    <div>
      <MenuComponent />
      <div className='title-user'>
        <h1>Configuración del perfil</h1>
        {userData && (
          <h1>Bienvenido, {userData.firstname}!</h1>
        )}
      </div>
      {userId ? (
        <div className="user-section">
          <Button className="button-logout" onClick={handleLogout}>
            Cerrar sesión
          </Button>
          <br />
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
                Esta acción no se puede deshacer. ¿Estás seguro de eliminar la cuenta?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button onClick={handleDeleteAccount} autoFocus>
                Sí, estoy seguro
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
};

export default UserLog;
