import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import './login.scss';
import { jwtDecode } from 'jwt-decode';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Frank from '../../assets/images/Frank.png';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('El correo es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

const getRolFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken?.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOpenError = () => setShowErrorModal(true);
  const handleCloseError = () => setShowErrorModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/login', values);

      if (response.status === 200) {
        const token = response.data.access;
        const refresh = response.data.refresh;

        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);

        const rol = getRolFromToken(token);

        setTimeout(() => {
          if (rol === 'user') {
            navigate('/');
          } else {
            navigate('/admin');
          }
        }, 2000);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    if (error.response && error.response.status === 401) {
      setErrorMessage('Credenciales inválidas. Verifica tu correo y contraseña.');
      handleOpenError();
    } else if (error.response) {
      setErrorMessage(error.response.data.msg);
      handleOpenError();
      console.error('Error de respuesta del servidor:', error.response.data);
    } else if (error.request) {
      console.error('Error de solicitud HTTP:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  const modalBoxStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="body-login">
      <div>
        <img className="logo-full" src={Frank} alt="Logo Full House Shoes" />
      </div>
      <div className="sign-in-container">
        <div className="sign-in-box">
          <form onSubmit={handleOnSubmit}>
            <h2 className="title-login">Full House Shoes</h2>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button className="boton-login" type="submit" style={{ cursor: 'pointer' }}>
              Iniciar sesión
            </button>
            <div className="recuperar-contrasena">
              <a type="a" onClick={handleOpen}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
        <div className="register-login">
          <h4 className="create-account">¿No tienes una cuenta? </h4>
          <a type="a" onClick={() => navigate('/register')}>
            Regístrate
          </a>
        </div>
      </div>

      {showModal && (
        <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalBoxStyles}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
              Restablecer contraseña
            </Typography>
            <Typography id="modal-modal-description" sx={{ color: 'black', mt: 2 }}>
              Ingresa el email para actualizar la contraseña
            </Typography>
            <TextField label="Email" variant="outlined" fullWidth sx={{ mt: 2 }} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Box>
        </Modal>
      )}

      {showErrorModal && (
        <Modal
          open={showErrorModal}
          onClose={handleCloseError}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalBoxStyles}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'black' }}>
              Error al iniciar sesión
            </Typography>
            <Typography id="modal-modal-description" sx={{ color: 'red', mt: 2 }}>
              {errorMessage}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};
