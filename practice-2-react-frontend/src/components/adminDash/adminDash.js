import { Button, Layout, Table, Row, Col, Modal, Alert, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import './adminDash.scss'
import logo from '../../assets/images/Logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Products from './productsDash/productsDash'

const avatars = require.context('../../assets/images/avatars', false, /\.(png|jpe?g|svg)$/);

function Admin (){
  const columns = [
    {
      title: "Nombre",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Tipo de documento",
      dataIndex: "documentType",
      key: "documentType",
    },
    {
      title: "Documento",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={() => handleToggleActive(record._id, !text)}
        />
      ),
    },
  ];
  
    const menuItems = [
        { id: 1, label: "Listar Usuarios", path: "/admin/listar-usuarios" },
        { id: 2, label: "Editar Usuarios", path: "/admin/editar-usuarios" },
      ];
      const navigate = useNavigate();
      const [createCategoryVisible, setCreateCategoryVisible] = useState(false);
      const [visible, setVisible] = useState(false);
      const [visible2, setVisible2] = useState(false);
      const [document, setDocumentNumber] = useState("");
      const [alertVisible, setAlertVisible] = useState(false);
      const [alertType, setAlertType] = useState("");
      const [alertMessage, setAlertMessage] = useState("");
      const [currentUser, setCurrentUser] = useState(null);
      const [userData, setUserData] = useState(null);
      const [AdminData, setAdminData] = useState(null);
      const [categoryData, setCategoryData] = useState(null);
      const token = localStorage.getItem("token");
      const [loaded, setLoaded] = useState(false);
      const [userId, setUserId] = useState(null);
      const [userDocument, setUserDocument] = useState(null);
      const [selectedOption, setSelectedOption] = useState('Perfil');
      const [menuVisible, setMenuVisible] = useState(false);
      const [CategorydeleteModalVisible, setCategoryDeleteModalVisible] = useState(false);
      const [CategoryToDeleteId, setCategoryToDeleteId] = useState(null);
      const [categoryForm, setCategoryForm] = useState({
        name: "",
        description: "",
        active: false,
      });

    
      
    const handleMenuClick = (option) => {
      setSelectedOption(option);
    };

    const handleCategoryFormChange = (field, value) => {
      setCategoryForm({
        ...categoryForm,
        [field]: value,
      });
    };


    const handleSaveCategory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/v1/category",
          categoryForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        console.log("Respuesta del backend:", response.data);
    
        setAlertType('success');
        setAlertMessage('La categoría se creó con éxito');
        setAlertVisible(true);
        hideCreateCategoryModal();
        getCategoriesrData();
      } catch (error) {
        console.error('Error al crear la categoría:', error);
        setAlertType('error');
        setAlertMessage('Error al crear la categoría');
        setAlertVisible(true);
      }
    };
    

    const createCategoryModalContent = (
      <div>
        <h2>Crear Categoría</h2>
        <Form>
          <Form.Item label="Nombre">
            <Input
              value={categoryForm.name}
              onChange={(e) => handleCategoryFormChange("name", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Descripción">
            <Input.TextArea
              value={categoryForm.description}
              onChange={(e) => handleCategoryFormChange("description", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Activo">
            <Switch
              checked={categoryForm.active}
              onChange={(checked) => handleCategoryFormChange("active", checked)}
            />
          </Form.Item>
        </Form>
      </div>
    );
    
    const showCreateCategoryModal = () => {
      setCreateCategoryVisible(true);
    };
    
    const hideCreateCategoryModal = () => {
      setCreateCategoryVisible(false);
    };
  const handleOpenModal = (documento) => {
    console.log("modal");
    setVisible(true);
    setDocumentNumber(documento);
  };

  const handleSave = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  const handleOpenModal2 = (documento) => {
    console.log("modal");
    setVisible2(true);
    setDocumentNumber(documento);
  };

  const handleSave2 = () => {
    deleteUser(document);
    setVisible2(false);
  };

  const handleCancel2 = () => {
    setVisible2(false);
  };

  const handleToggleActive = async (id, newActive) => {
    console.log('Changing active status:', newActive);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/user/${id}`,
        {active: newActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
      console.log('Request to server:', {
        url: `http://localhost:3001/api/v1/user/${id}`,
        method: 'PATCH',
        data: { active: newActive },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
        
      if (response.status === 200) {
        console.log(response.data);
        getUserData(token);
        setAlertType('success');
        setAlertMessage('El estado se actualizó con éxito');
        setAlertVisible(true);
      } else {
        console.error('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
    }
  };
  
  const handleToggleActiveCategory = async (id, newActive) => {
    console.log('Changing active status:', newActive);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/category/${id}`,
        {active: newActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
      if (response.status === 200) {
        console.log(response.data);
        setAlertType('success');
        setAlertMessage('El estado se actualizó con éxito');
        setAlertVisible(true);
      } else {
        console.error('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
    }
    getCategoriesrData();
  };

  const deleteUser = async (documento) => {
    try {
      const response = await axios
        .delete(`http://localhost:3001/api/v1/user/${documento}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            setAlertType("success");
            setAlertMessage("El usuario ha sido eliminado con éxito");
            setAlertVisible(true);
            console.log("Usuario eliminado:", response.data);
          }
        }).catch((error) => {
          console.log(error.response.data);
        });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    getCategoriesrData();
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const decodedToken = jwtDecode(token);
      const currentUserId = decodedToken?.user_id;
      const filteredUsers = response.data.filter(user => user._id !== currentUserId);
  
      setUserData(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const getAdminrData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  


  const getCategoriesrData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const menuOptions = [
    { label: 'Perfil', icon: <AccountCircleIcon /> },
    { label: 'Usuarios', icon: <SupervisedUserCircleIcon /> },
    { label: 'Categorías', icon: <GroupWorkIcon /> },
    { label: 'Productos', icon: <ShoppingCartIcon /> },
    { label: 'Config.', icon: <BuildCircleIcon /> }
  ];

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
  const showDeleteModalCategory = (categoryId) => {
    setCategoryToDeleteId(categoryId);
    setCategoryDeleteModalVisible(true);
  };
  
  const handleDeleteCategory = async (categoryId) => {
    try {
      showDeleteModalCategory(categoryId);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const handleCategoryConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/category/${CategoryToDeleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        getCategoriesrData();
        setCategoryDeleteModalVisible(false);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  useEffect(() => {
    getUserData();
    getCategoriesrData();
    getAdminrData();
    console.log(categoryData);
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken?.user_id);
      setUserDocument(decodedToken?.document);
    }
  }, [token]); 

  const UserTable = () => {

    const handleRowClick = (record) => {
      const id = record._id;
      console.log("Id seleccionado:", id);
    };
  
    const filteredUserData = userData?.filter(
      (user) => user.document !== currentUser?.document
    );
    
    
    return (
      <Table
        dataSource={filteredUserData}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    );
  };

  const CategoryTable = () => {
    const handleRowClick = (record) => {
      const id = record._id;
      console.log("Id seleccionado:", id);
    };

    const columns = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Descripcion",
        dataIndex: "description",
        key: "description",
      },
      {
        title: 'Activo',
        dataIndex: 'active',
        key: 'active',
        render: (text, record) => (
          <Switch
            checked={text}
            onChange={() => handleToggleActiveCategory(record._id, !text)}
          />
        ),
      },
      {
        title: "Acciones",
        dataIndex: "actions",
        key: "actions",
        render: (text, record) => (
          <Button
            type="danger"
            className="delete-button"
            onClick={() => handleDeleteCategory(record._id)}
          >
            Eliminar
          </Button>
        ),
      }
    ];
    return (
      <Table
        dataSource={categoryData}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    );
  };

  return (
    <div className="admin-dashboard">

      <div className="menu">
      <a onClick={() => navigate('/')}>
        <img className="uamLogo" src={logo} alt="Logo Full House Shoes" style={{ cursor: 'pointer' }} />
      </a>
      <button className="toggle-button" onClick={toggleMenu}>
        {menuVisible ? <MenuOpenIcon /> : <MenuIcon/>}
      </button>
      <ul id="menu-list">
      </ul>
      <div className="user-section">
        <a onClick={() => navigate('/admin')}>
        <img  className="avatar-admin" src={avatars.keys().includes(`./${userDocument}.png`) ? avatars(`./${userDocument}.png`) : require('../../assets/images/Frank.png')} alt="Imagen de usuario" style={{ cursor: 'pointer' }}/>
        </a>
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
            <div>
            <h1>¡ Bienvenido, {AdminData?.firstname} !</h1>

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
                  <td>{AdminData?.email}</td>
                </tr>
                <tr>
                  <td>No. Documento:</td>
                  <td>{AdminData?.document}</td>
                </tr>
                <tr>
                  <td>Pais:</td>
                  <td>{AdminData?.country}</td>
                </tr>
              </tbody>
            </table>

            


            </div>
          )}
          {selectedOption === 'Usuarios' && (
            <Layout className="dashboard-admin">
            <div className="div-admin">
            {alertVisible && (
                <Alert
                  message={alertMessage}
                  type={alertType}
                  showIcon
                  onClose={() => setAlertVisible(false)}
                />
              )}
              <Row gutter={[16, 16]} style={{ marginBottom: "40px" }}>
                <div className="title">
                  <h1>Lista de usuarios</h1>
                </div>
              </Row>
              <Row id="row-tabla" gutter={[10, 10]} style={{ marginBottom: "10px" }}>
                <UserTable />
              </Row>
            </div>
          </Layout>
          )}
          {selectedOption === 'Categorías' && (
            <div className="categories-admin">
              <h1>Categorías</h1>
              <CategoryTable />
              <div className="buttons-category">
                <Button onClick={() => showCreateCategoryModal(true)}>Crear categoria</Button>
              </div>
              
            </div>
        )}
        {selectedOption === 'Productos' && (
            <div className="products-admin">
              <h1>Productos</h1>
              <Products />
            </div>
        )}
        </div>
      </div>

      <Modal
          title="Confirmar Eliminación"
          open={CategorydeleteModalVisible}
          onOk={handleCategoryConfirmDelete}
          onCancel={() => setCategoryDeleteModalVisible(false)}
          okText="Eliminar"
          cancelText="Cancelar"
        >
          <p>
            ¿Estás seguro de que deseas eliminar esta categoria?
          </p>
        </Modal>

        <Modal
          title="Crear Categoría"
          visible={createCategoryVisible}
          onOk={() => {
            console.log("Valores del formulario:", categoryForm);
            handleSaveCategory();
          }}
          onCancel={hideCreateCategoryModal}
        >
          {createCategoryModalContent}
        </Modal>

    </div>
  );
};

export default Admin;
