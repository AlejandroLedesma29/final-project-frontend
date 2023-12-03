import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFieldValue } from "formik";
import { Button, Input, Row, Col } from "antd";
import { Select } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const { Option } = Select;

const initialValues = {
  firstname: "",
  lastname: "",
  country: "",
  depto: "",
  municipality: "",
  state: "",
  documentType: "",
  document: "",
  email: "",
  password: "",
  termsAndConditions: false,
  avatar: null,
};


const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("El nombre es requerido"),
  lastname: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener como mínimo 8 caracteres"
    ),
  confirmarContraseña: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales")
    .required("Debes confirmar la contraseña"),
  documentType: Yup.string()
    .required("El tipo de documento es requerido")
    .oneOf(
      [
        "Tarjeta de identidad",
        "Cédula de Ciudadanía",
        "Cédula de Extranjería",
        "Pasaporte",
      ],
      "Tipo de documento inválido"
    ),
  document: Yup.string()
    .required("El número de documento es requerido")
    .matches(/^[0-9]+$/, "El número de documento debe contener solo números"),
  termsAndConditions: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones para registrarte")
    .required("Debes aceptar los términos y condiciones para registrarte"),
});


export const RegisterForm = () => {
    const [showDepartamentosMunicipios, setShowDepartamentosMunicipios] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchDepartamentos();
      fetchCountries();
    }, []);
  
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get("https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento");
        const dataFilter = [...new Set(response.data.map(JSON.stringify))].map(JSON.parse);
  
        const sortedDepartamentos = dataFilter.sort((a, b) => a.departamento.localeCompare(b.departamento));
        setDepartamentos(sortedDepartamentos);
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchCountries = async () => {
        try {
          const response = await axios.get("https://restcountries.com/v3.1/all");
          const countriesArray = response.data.map((country) => ({
            code: country.cca2,
            name: country.name.common,
          }));
      
          const colombia = countriesArray.find((country) => country.name === "Colombia");

          const otherCountries = countriesArray.filter((country) => country.name !== "Colombia");

          const sortedOtherCountries = otherCountries.sort((a, b) => a.name.localeCompare(b.name));

          setCountries([colombia, ...sortedOtherCountries]);
        } catch (error) {
          console.error(error);
        }
      };
  
    const fetchMunicipios = async (departamento) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=municipio&departamento=${departamento}`);
  
        const sortedMunicipios = response.data.sort((a, b) => a.municipio.localeCompare(b.municipio));
        setMunicipios(sortedMunicipios);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    const onSubmit = (values, { setSubmitting, resetForm }) => {
      const { confirmarContraseña, termsAndConditions, avatar, document, ...data } = values;
      console.log("Datos a enviar:", data);
      const formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
    
      if (avatar) {
        formData.append("avatar", avatar, `${document}.png`);
      }
      formData.append("document", document)
    
      axios
        .post("http://localhost:3001/api/v1/register", formData)
        .then((response) => {
          if (response.status === 201) {
            setShowSuccessMessage(true);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error(error);
          setShowErrorMessage(true);
          setErrorMessage('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    };

  return (
    <div className="formulario-dimensiones">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue}) => (
          <Form >
            {showSuccessMessage && (
              <div style={{ color: "green", marginBottom: "10px" }}>
                Registro exitoso
              </div>
            )}
            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
            <Col span={12} className="name-register">
                <Field name="firstname" as={Input}  placeholder="Nombre" />
                <ErrorMessage
                name="firstname"
                component="div"
                className="error-message"
                />
            </Col>
            <Col span={12} className="lastname-register">
                <Field name="lastname" as={Input}  placeholder="Apellido" />
                <ErrorMessage
                name="lastname"
                component="div"
                className="error-message"
                />
            </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                <Col span={24} className="email-register">
                <Field name="email" as={Input}  placeholder="Correo" />
                <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                />
                </Col>
                
            </Row>


            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
              <Col span={12} className="password-register">
                <Field
                  name="password"
                  as={Input.Password}
                  placeholder="Contraseña"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </Col>
              <Col span={12} className="validate-password-register">
                <Field
                  name="confirmarContraseña"
                  as={Input.Password}
                  placeholder="Confirmar"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
                <ErrorMessage
                  name="confirmarContraseña"
                  component="div"
                  className="error-message"
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
              <Col span={12} className="document-type-register">
                <Field name="documentType">
                  {({ field, form }) => (
                    <Select
                      className="select-custom"
                      placeholder="Tipo de documento"
                      value={field.value}
                      onChange={(value) => {
                        form.setFieldValue("documentType", value);
                      }}
                      onBlur={field.onBlur}
                    >
                      <Option value="" disabled>
                        Tipo de documento
                      </Option>
                      <Option value="Tarjeta de identidad">
                        Tarjeta de identidad
                      </Option>
                      <Option value="Cédula de Ciudadanía">
                        Cédula de Ciudadanía
                      </Option>
                      <Option value="Cédula de Extranjería">
                        Cédula de Extranjería
                      </Option>
                      <Option value="Pasaporte">Pasaporte</Option>
                    </Select>
                  )}
                </Field>

                <ErrorMessage
                  name="documentType"
                  component="div"
                  className="error-message"
                />
              </Col>
              <Col span={12} className="document-register">
                <Field
                  name="document"
                  as={Input} 
                  placeholder="Documento"
                />
                <ErrorMessage
                  name="document"
                  component="div"
                  className="error-message"
                />
              </Col>
            </Row>

             <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
              <Col span={12} className="country-register">
              <Field name="country">
              {({ field }) => (
                <Select
                  className="select-custom"
                  name={field.name}
                  value={field.value}
                  onChange={(value) => {
                    const selectedCountry = countries.find((country) => country.code === value);
                    setFieldValue("country", selectedCountry ? selectedCountry.name : ""); 
                    if (value === "CO") {
                      setShowDepartamentosMunicipios(true);
                    } else {
                      setShowDepartamentosMunicipios(false);
                    }
                  }}
                >
                      <Option value="" disabled>
                        Seleccione un país
                      </Option>
                      {countries.map((country) => (
                        <Option key={country.code} value={country.code}>
                          {country.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error-message"
                />
              </Col>
              {showDepartamentosMunicipios ? (
                <>
                <Col span={12} className="depto-register">
                    <Field name="department">
                                            {({ field }) => (
                                              <div className="alguna-cosa">
                                                <Select
                                                    placeholder="Departamento"
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        setFieldValue("department", value);
                                                        fetchMunicipios(value);
                                                    }}
                                                >
                                                    <Option value="">Departamento</Option>
                                                    {departamentos.map((departamento) => (
                                                        <Option
                                                            key={departamento.departamento}
                                                            value={departamento.departamento}
                                                        >
                                                            {departamento.departamento}
                                                        </Option>
                                                    ))}
                                                </Select>
                                                </div>
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="department"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Col>
                                    <Row gutter={[16, 16]} >
                                    <Col span={24} >
                                        <Field
                                            className="select-custom"
                                            name="municipality"
                                            as={Select}
                                            placeholder="Municipio"
                                            disabled={loading || !municipios.length}
                                            onChange={(value) => setFieldValue("municipality", value)}
                                        >
                                            <Option value="">Municipio</Option>
                                            {municipios.map((municipio) => (
                                                <Option
                                                    key={municipio.municipio}
                                                    value={municipio.municipio}
                                                >
                                                    {municipio.municipio}
                                                </Option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="municipality"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Col>
                                    </Row>
                                </>
                            ) : (
                                <Col span={12}>
                                  <Field name="state" as={Input}  placeholder="Estado" />
                                  <ErrorMessage
                                    name="state"
                                    component="div"
                                    className="error-message"
                                  />
                                </Col>
                              )}
                            </Row>

                            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                            <Col span={24} className="avatar-register">
                              <div className="image-avatar">
                              <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={(event) => {
                                  setFieldValue("avatar", event.currentTarget.files[0]);
                                }}
                              />
                              <ErrorMessage
                                name="avatar"
                                component="div"
                                className="error-message"
                              />
                              </div>
                            </Col>
                          </Row>
                          
                            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                              <Col span={24} className="terms-and-conditions">
                                <Field name="termsAndConditions" type="checkbox">
                                  {({ field }) => (
                                    <label>
                                      <input
                                        {...field}
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={() => setFieldValue("termsAndConditions", !field.value)}
                                      />
                                       Acepto los{" "}
                                      <a href="/terms" target="_blank" rel="noopener noreferrer">
                                        términos y condiciones
                                      </a>
                                      </label>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="termsAndConditions"
                                  component="div"
                                  className="error-message"
                                />
                              </Col>
                            </Row>

                            

            <div className="button-container">
              <Button className="register-button" onClick={() => window.location.replace("/")}>
                Cancelar
              </Button>
              <Button  className="register-button" htmlType="submit">
                Regístrate
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
