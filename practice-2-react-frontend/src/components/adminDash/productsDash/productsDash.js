import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  TablePagination,
} from "@mui/material";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import axios from "axios";
import  ProductsForm  from "./productsForm.js";
import MenuItem from "@mui/material/MenuItem";

const Products = () => {
  const columns = [
    { id: "name", label: "Libro", maxWidth: 100 },
    { id: "description", label: "Descripción", maxWidth: 100 },
    { id: "category", label: "Categoria", maxWidth: 100 },
    { id: "active", label: "Estado", maxWidth: 100 },
    { id: "available", label: "Disponibilidad", maxWidth: 100 },
  ];

  const [products, setProducts] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = (products || []).filter(
    (product) => !selectedCategory || product.category === selectedCategory
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const token = localStorage.getItem("token");

  const actualizarDisponibilidadLibros = async (productId, newAvailableValue) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`
        http://localhost:3001/api/v1/products/${productId}`,  // Include category ID in the URL
        {
          available: newAvailableValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      console.log(response.status);
  
      if (response.status === 200) {
        console.log('actualizado')
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la categoria:", error);
  
      if (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getProducts = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/products/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setProducts(data);
        console.log("Nuevo valor de products:", products);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts(token);
  }, [token]);

  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    const getCategories = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setCategoriesData(data);
        console.log("Nuevo valor de categoriesData:", categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories(token);
  }, [token]);


  console.log("slecate", selectedCategory);

  const BooksTable = () => {
    const [switchValues, setSwitchValues] = useState({});

    useEffect(() => {
      const initialSwitchValues = {};
      (products || []).forEach((row) => {
        initialSwitchValues[row.id] = row.available;
      });
      setSwitchValues(initialSwitchValues);
    }, [products]);

    const handleSwitchChange = async (event, productId) => {
      try {
        setSwitchValues((prevSwitchValues) => ({
          ...prevSwitchValues,
          [productId]: event.target.checked,
        }));

        await actualizarDisponibilidadLibros(productId, event.target.checked);
      } catch (error) {
        console.error("Error al actualizar el estado de la categoria:", error);
      }
    };

    const handleRowClick = (record) => {
      const id = record._id;
      console.log("Documento seleccionado:", id);
    };

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(filteredProducts || [])
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => (
                <TableRow key={row._id} onClick={() => handleRowClick(row)}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === "active" || column.id === "available" ? (
                        <Switch
                          checked={row[column.id]}
                          color="primary"
                          onChange={(event) =>
                            handleSwitchChange(event, row._id)
                          }
                        />
                      ) : column.id === "category" ? (
                        (categoriesData || []).find((category) => category._id === row[column.id])?.name || "N/A"
                      ) : row[column.id] !== "" && row[column.id] !== null ? (
                        String(row[column.id])
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(products || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  };

  return (
    <div>
      <div className="categories-div-title">
        <label className="categories-div-title-label">Libros</label>
      </div>
      <div>
        <ProductsForm />
      </div>
      <div className="select-filter-category">
        <label>Seleccione una categoría para filtrar los productos</label>
        <TextField
          select
          label="Categoría"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-field"
        >
          <MenuItem value="" disabled>
            Seleccione una categoría
          </MenuItem>
          <MenuItem value="">Todas</MenuItem>
          {(categoriesData || [])
            .filter((category) => category.active === true)
            .map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
        </TextField>
      </div>
      <div>
        <BooksTable />
      </div>
    </div>
  );
};

export default Products;
