import React, { useState, useEffect } from "react";
import { Button, Layout, Table, Modal, Switch,Input, message, Upload, Row, Col } from "antd";
import { Formik, Form, Field, ErrorMessage, setFieldValue, useFormik   } from "formik";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import * as Yup from "yup";
import "./productsDash.scss";
import { Select } from 'antd';

const avatars = require.context('../../assets/images/Productsphotos', false, /\.(png|jpe?g|svg)$/);
const { Option } = Select;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  brand: Yup.string().required("La marca es requerido"),
  model: Yup.string().required("El modelo es requerido"),
  price: Yup.string()
    .required("El Precio es requerido")
    .matches(/^[0-9]+$/, "El precio debe contener solo números"),
});

const initialValues = {
  name: "",
  brand: "",
  model: "",
  description: "",
  photo1: "",
  photo2: "",
  photo3: "",
  active: false,
  available: false,
  price : "",
  category : ""
};


const Products = () => {
  const [productsData, setProductsData] = useState(null);
  const [createProductVisible, setCreateProductVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState({
    photo1: false,
    photo2: false,
    photo3: false,
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
  });
  const token = localStorage.getItem("token");
  const [ProductdeleteModalVisible, setProductDeleteModalVisible] = useState(false);
  const [ProductToDeleteId, setProductToDeleteId] = useState(null);

  

  const getProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/product", {});
      setProductsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/category",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const categoryNames = response.data.map(category => ({
        value: category._id, 
        label: category.name
      }));
      setCategories(categoryNames);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/product/${ProductToDeleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        getProductsData();
        setProductDeleteModalVisible(false);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const [categories, setCategories] = useState([]);


  const showCreateProductsModal = () => {
    setCreateProductVisible(true);
  };

  const hideCreateProductModal = () => {
    formik.resetForm();
    setCreateProductVisible(false);
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { name, photo1, photo2, photo3, ...data } = values;
    console.log("Datos a enviar:", data);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    
    let contador = 1 ;
    if (photo1) {
      formData.append("photo1", photo1, `${name}${contador}.png`);
      contador += 1;
    }
    if (photo2) {
      formData.append("photo2", photo2, `${name}${contador}.png`);
      contador += 1;
    }
    if (photo3) {
      formData.append("photo3", photo3, `${name}${contador}.png`);
      contador += 1;
    }
    formData.append("name", name)
  
    axios
      .post("http://localhost:3001/api/v1/product", formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          hideCreateProductModal();
          setSelectedPhotos({
            photo1: null,
            photo2: null,
            photo3: null,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setShowErrorMessage(true);
        setErrorMessage('Hubo un error al registrar el producto. Por favor, inténtalo de nuevo.');
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const handleToggleActiveProduct = async (id, newActive) => {
    console.log('Changing active status:', newActive);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/product/${id}`,
        {active: newActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
    }
    getProductsData();
  };

  const handleToggleAvailableProduct = async (id, newAvailable) => {
    console.log('Changing active status:', newAvailable);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/product/${id}`,
        {available: newAvailable },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error('Respuesta inesperada del servidor:', response);
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
    }
    getProductsData();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const showDeleteModalProduct = (productId) => {
    setProductToDeleteId(productId);
    setProductDeleteModalVisible(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      showDeleteModalProduct(productId);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  useEffect(() => {
    getProductsData();
    getCategoriesData();
  }, []);

  const ProductsTable = () => {
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
        title: "Foto",
        dataIndex: "photo1",
        key: "photo1",
        render: (text, record) => {
          const imagePath = avatars.keys().includes(`./${text}`)
            ? avatars(`./${text}`)
            : require('../../assets/images/Frank.png');
          return (
            <img
              src={imagePath}
              alt={record.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          );
        },
      },
      {
        title: "Descripcion",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Marca",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Modelo",
        dataIndex: "model",
        key: "model",
      },
      {
        title: "Precio",
        dataIndex: "price",
        key: "price",
      },
      {
        title: 'Activo',
        dataIndex: 'active',
        key: 'active',
        render: (text, record) => (
          <Switch
            checked={text}
            onChange={() => handleToggleActiveProduct(record._id, !text)}
          />
        ),
      },
      {
        title: 'Disponible',
        dataIndex: 'available',
        key: 'available',
        render: (text, record) => (
          <Switch
            checked={text}
            onChange={() => handleToggleAvailableProduct(record._id, !text)}
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
            onClick={() => handleDeleteProduct(record._id)}
          >
            Eliminar
          </Button>
        ),
      }
    ];
    return (
      <Table
        dataSource={productsData}
        columns={columns}
        pagination={{ defaultPageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        style={{ marginBottom: "-30px" }}
      />
    );
  };

  const createProductsModalContent = (
    <div className="products-form-content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form >
            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
            <Col span={12} className="name-register">
                <Field name="name" as={Input}  placeholder="Nombre" />
                <ErrorMessage
                name="name"
                component="div"
                className="error-message"
                />
            </Col>
            <Col span={12} className="brand-register">
                <Field name="brand" as={Input}  placeholder="Marca" />
                <ErrorMessage
                name="brand"
                component="div"
                className="error-message"
                />
            </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                <Col span={12} className="description-register">
                <Field name="description" as={Input}  placeholder="Descripcion" />
                <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                />
                </Col>
                <Col span={12} className="model-register">
                <Field
                  name="model"
                  as={Input}
                  placeholder="Modelo"
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className="error-message"
                />
              </Col>
            </Row>


           



            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
              <Col span={12} className="categories-register">
                <Select
                  name="category"
                  placeholder="Categoría"
                  onChange={(value) => setFieldValue('category', value)}
                  value={values.category}
                  className="category-register"
                >
                  {categories.map((cat) => (
                    <Option key={cat.value} value={cat.value} disabled={values.category === cat.value}>
                      {cat.label}
                    </Option>
                  ))}
                </Select>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-message"
                />
              </Col>
              <Col span={12} className="price-register">
                <Field
                  name="price"
                  as={Input}
                  type="number"
                  placeholder="Precio"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-message"
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
              <Col span={12} className="active-register">
              <Switch
                checked={values.active}
                onChange={(checked) => setFieldValue('active', checked)}
                checkedChildren="Activo"
                unCheckedChildren="Inactivo"
              />
              </Col>
              <Col span={12} className="available-register">
              <Switch
                checked={values.available}
                onChange={(checked) => setFieldValue('available', checked)}
                checkedChildren="Disponible"
                unCheckedChildren="NoDisponible"
              />
              </Col>
            </Row>

            {/* Campo de entrada para la primera foto */}
            <Row gutter={[16, 16]} >
              <Col span={24} className="avatar-register">
                <div className="image-avatar">
                  <input
                    type="file"
                    name="photo1"
                    accept="image/*"
                    onChange={(event) => handlePhotoChange(event, setFieldValue, 'photo1')}
                    className="custom-input-style"
                  />
                  <ErrorMessage
                    name="photo1"
                    component="div"
                    className="error-message"
                  />
                </div>
              </Col>
            </Row>

            {/* Vista previa de la primera foto */}
            {selectedPhotos.photo1 && (
              <div className="selected-photo-preview">
                <img
                  src={selectedPhotos.photo1}
                  alt="Selected Preview"
                  style={{ width: "30px",'margin-top': "0px", height: "30px", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Campo de entrada para la segunda foto */}
            <Row gutter={[16, 16]} >
              <Col span={24} className="avatar-register">
                <div className="image-avatar">
                  <input
                    type="file"
                    name="photo2"
                    accept="image/*"
                    onChange={(event) => handlePhotoChange(event, setFieldValue, 'photo2')}
                    className="custom-input-style"
                  />
                  <ErrorMessage
                    name="photo2"
                    component="div"
                    className="error-message"
                  />
                </div>
              </Col>
            </Row>

            {/* Vista previa de la segunda foto */}
            {selectedPhotos.photo2 && (
              <div className="selected-photo-preview">
                <img
                  src={selectedPhotos.photo2}
                  alt="Selected Preview"
                  style={{ width: "30px", 'margin-top': "0px", height: "30px", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Campo de entrada para la tercera foto */}
            <Row gutter={[16, 16]} >
              <Col span={24} className="avatar-register">
                <div className="image-avatar">
                  <input
                    type="file"
                    name="photo3"
                    accept="image/*"
                    onChange={(event) => handlePhotoChange(event, setFieldValue, 'photo3')}
                    className="custom-input-style"
                  />
                  <ErrorMessage
                    name="photo3"
                    component="div"
                    className="error-message"
                  />
                </div>
              </Col>
            </Row>

            {/* Vista previa de la tercera foto */}
            {selectedPhotos.photo3 && (
              <div className="selected-photo-preview">
                <img
                  src={selectedPhotos.photo3}
                  alt="Selected Preview"
                  style={{ width: "30px", 'margin-top': "0px", height: "30px", objectFit: "cover" }}
                />
              </div>
            )}

            <div className="button-container">
              <Button  className="register-product-button" htmlType="submit">
                Agregar Producto
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
  
  const handlePhotoChange = (event, setFieldValue, photoKey) => {
    const selectedFile = event.currentTarget.files[0];
    setFieldValue(photoKey, selectedFile);

    // Mostrar la vista previa de la foto seleccionada
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhotos((prevPhotos) => ({
          ...prevPhotos,
          [photoKey]: reader.result,
        }));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedPhotos((prevPhotos) => ({
        ...prevPhotos,
        [photoKey]: null,
      }));
    }
  };
  

  return (
    <div className="products-container">
      <ProductsTable />
      <div className="buttons-category">
        <Button onClick={showCreateProductsModal}>Crear Producto</Button>
      </div>
  
      <Modal
        title="Crear Producto"
        visible={createProductVisible}
        onCancel={hideCreateProductModal}  
        footer={null}  
      >
        {createProductsModalContent}
      </Modal>
  
      <Modal
        title="Confirmar Eliminación"
        visible={ProductdeleteModalVisible}
        onOk={handleProductConfirmDelete}
        onCancel={() => setProductDeleteModalVisible(false)}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <p>
          ¿Estás seguro de que deseas eliminar este producto?
        </p>
      </Modal>
    </div>
  );
};

export default Products;
