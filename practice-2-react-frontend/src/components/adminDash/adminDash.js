import { Button, Layout, Table, Row, Col, Modal, Alert, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import AdminMenu from './adminMenu/adminMenu';

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
      const [visible, setVisible] = useState(false);
      const [visible2, setVisible2] = useState(false);
      const [document, setDocumentNumber] = useState("");
      const [alertVisible, setAlertVisible] = useState(false);
      const [alertType, setAlertType] = useState("");
      const [alertMessage, setAlertMessage] = useState("");
      const [currentUser, setCurrentUser] = useState(null);
      const [userData, setUserData] = useState(null);
      const token = localStorage.getItem("token");
      const [loaded, setLoaded] = useState(false);

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
  
  const deleteUser = async (documento) => {
    try {
      const response = await axios
        .delete(`http://localhost:5000/api/v1/user/${documento}`, {
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
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  useEffect(() => {
    getUserData();
  }, []); 

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

  return (
    <div>
      <AdminMenu />
    <Layout className="dashboard-delegates">
      <div className="div-delegate">
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
            <label>Dashboard Full House Shoes </label>
          </div>
        </Row>
        <Row gutter={[16, 16]} style={{ marginBottom: "40px" }}>
          <div className="div-botones">
            <Button className="botones">
              <Link to={"/admin/users/register"}>Añadir Usuario</Link>
            </Button>
            <Button className="botones" onClick={handleOpenModal}>
              Editar Usuario
            </Button>
            <Modal
              open={visible}
              className="modal"
              title="Ingresar número de documento"
              onCancel={handleCancel}
              onOk={handleSave}
            >
              <Form layout="vertical">
                <Form.Item label="Número de documento del usuario a editar">
                  <Input
                    placeholder="Número de documento"
                    value={document}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Modal>
            <Button className="botones" onClick={handleOpenModal2}>
              Eliminar Usuario
            </Button>
            <Modal
              open={visible2}
              className="modal"
              title="Ingresar número de documento"
              onCancel={handleCancel2}
              onOk={handleSave2}
            >
              <Form layout="vertical">
                <Form.Item label="Número de documento del usuario a eliminiar">
                  <Input
                    placeholder="Número de documento"
                    value={document}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Modal>
            <Button className="botones" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
          </div>
        </Row>
        <Row id="row-tabla" gutter={[10, 10]} style={{ marginBottom: "10px" }}>
          <UserTable />
        </Row>
      </div>
    </Layout>
    </div>
  );
};

export default Admin;
