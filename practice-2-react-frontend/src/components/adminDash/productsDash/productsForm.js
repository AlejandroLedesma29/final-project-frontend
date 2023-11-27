import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "./productsDash.scss";

const ProductsForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

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
        const activeCategories = response.data.filter(
          (category) => category.active
        );

        setCategories(activeCategories);
        console.log("Nuevo valor de categoriesData:", categories);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories(token);
  }, [token]);
  /* 
  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("photo1", file);
    }
  }; */

  const initialValues = {
    name: "",
    description: "",
    photo1: "",
    photo2: "",
    photo3: "",
    available: "",
    price: "",
    category: "",
    author: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    available: Yup.string().required("La disponibilidad es requerida"),
    price: Yup.string().required("El precio es requerido"),
    author: Yup.string().required("El autor es requerido"),
    category: Yup.string().required("La categoría es requerida"),
  });

  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { ...data } = values;
    console.log("Datos a enviar:", data);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    /* if (photo1) {
      formData.append("avatar", avatar, ${document}.png);
      console.log("hola", document);
    }
    formData.append("document", document); */
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/v1/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          /* setShowSuccessMessage(true); */
          setTimeout(() => {}, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const handleFileChange = (event, setFieldValue, name) => {
    const files = event.currentTarget.files;

    // Limitar a un máximo de 3 archivos
    const maxFiles = 3;
    const selectedFiles = Array.from(files).slice(0, maxFiles);

    selectedFiles.forEach((file, index) => {
      setFieldValue(`photo${index + 1}`, file, `${name}photo${index + 1}.png`);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <Button
              variant="contained"
              onClick={() => setShowCategoryForm(true)}
            >
              Agregar libro <AddCircleSharpIcon />
            </Button>

            {showCategoryForm && (
              <>
                <div className="div-inputs">
                  <div>
                    <Field name="name">
                      {({ field, meta }) => (
                        <TextField
                          required
                          id="name"
                          name="name"
                          placeholder="Nombre"
                          label="Nombre"
                          {...field}
                          className="text-field-books"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field name="description">
                      {({ field, meta }) => (
                        <TextField
                          required
                          id="description"
                          description="description"
                          placeholder="Descripción"
                          label="Descripción"
                          {...field}
                          className="text-field-books"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field name="category">
                      {({ field, form }) => (
                        <TextField
                          select
                          label="Categoría"
                          {...field}
                          onChange={(e) =>
                            form.setFieldValue("category", e.target.value)
                          }
                          onBlur={field.onBlur}
                          error={
                            form.touched.category &&
                            Boolean(form.errors.category)
                          }
                          className="text-field-books"
                        >
                          <MenuItem value="" disabled>
                            Seleccione una categoría
                          </MenuItem>
                          <MenuItem value="All">Todas</MenuItem>
                          {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <div className="div-inputs">
                  <div>
                    <Field name="author">
                      {({ field, meta }) => (
                        <TextField
                          required
                          id="author"
                          description="author"
                          placeholder="Autor"
                          label="Autor"
                          {...field}
                          className="text-field-books"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="author"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field name="available">
                      {({ field, form }) => (
                        <TextField
                          select
                          label="Disponible"
                          {...field}
                          onChange={(e) =>
                            form.setFieldValue("available", e.target.value)
                          }
                          onBlur={field.onBlur}
                          error={
                            form.touched.available &&
                            Boolean(form.errors.available)
                          }
                          className="text-field-books"
                        >
                          <MenuItem value="" disabled>
                            Seleccione una opción
                          </MenuItem>
                          <MenuItem value={true}>Si</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </TextField>
                      )}
                    </Field>
                    <ErrorMessage
                      name="available"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field name="price">
                      {({ field, meta }) => (
                        <TextField
                          required
                          id="price"
                          description="price"
                          placeholder="Precio"
                          label="Precio"
                          {...field}
                          className="text-field-books"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <div className="div-inputs-photos">
                  <div>
                    <div>
                      <label>Máximo 3 archivos</label>
                    </div>
                    <Field name="photo1">
                      {({ field, form }) => (
                        <input
                          type="file"
                          name="photo1"
                          accept="image/*"
                          multiple
                          onChange={(event) => {
                            handleFileChange(
                              event,
                              form.setFieldValue,
                              values.name
                            );
                          }}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <div className="button-add-product">
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    Aceptar
                  </Button>
                </div>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductsForm;
