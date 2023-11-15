import "./register.scss";
import Layout from "antd/es/layout/layout";
import Logo from "../../assets/images/LogoBlancoE.png";
import React, { useState } from "react";
import { RegisterForm } from "./form";


const url_uam =
  "https://www.autonoma.edu.co/uamvirtual?errorcode=4#seccion-uamvirtual";

function Register(){
  const [form, setForm] = useState({
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
  });

  const handleChange = (values) => {
    setForm(values);
    console.table(form);
  };

  return (
    <Layout className="Layout-register">
      <div className="middle-box">
        <div className="register-box">
          <h1>Registro</h1>
          <RegisterForm handleChange={handleChange} />
        </div>
      </div>
      <img src={Logo} alt="Logo" className="bottom-logo" />
    </Layout>
  );
};

export default Register;
