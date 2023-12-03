import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Layout, Table, Row, Col, Modal, Alert, Switch } from "antd";
import axios from "axios";

const avatars = require.context('../../assets/images/Productsphotos', false, /\.(png|jpe?g|svg)$/);

const Products = () => {
  const [productsData, setProductsData] = useState(null);


  const getProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/product", {
      });
      setProductsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsData();
  },[]);
  
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
          console.log("Ruta de la imagen:", imagePath);
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
            onChange={() => {}}
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
            onClick={() => {}}
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
      />
    );
  };

  return (
    <div className="Products-container">
      <ProductsTable/>
    </div>
  );
};

export default Products;
