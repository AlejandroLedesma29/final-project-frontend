import React from "react";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import "./Footer.scss";
import locationicon from '../../assets/SVG/location-svgrepo-com.png'
import IGicon from '../../assets/SVG/instagram-square.png'
import TTicon from '../../assets/SVG/tiktok-square.png'
import WPicon from '../../assets/SVG/whatsapp-square.png'
import Logo from '../../assets/images/Logo.png'
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
    <footer className="footer">
      <div className="footer-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <div className="direction-container">
              <h2>Ubicación</h2>
            <div className="direction">
              <div><h5>¡ Visítanos !</h5></div>
              <a href="https://maps.app.goo.gl/p5i2qEwZmrMYmvjH7" target="_blank" rel="noopener noreferrer"><img src={locationicon} alt="Location Icon" className="location-icon"/>
              </a>
              </div>
              <div className="atention-hours">
                <h5 className="titles-hours">Horario de atención:</h5>
                <h5 className="titles-hours">8:00 am - 6:00pm</h5>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div className="privacy-container">
          <h2>Contacto</h2>
              <h5>fullhouse@gmail.com</h5>
              
              <Button variant="contained" className="button-politics" onClick={() => navigate("/help")}>PQRSF</Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
              <div className="social-container">
                <h2>Redes sociales</h2>
                <ul className="social-list">
                  <li>
                    <a href="https://www.instagram.com/fullhouse_shoes/" target="_blank" rel="noopener noreferrer">
                    <img src={IGicon} alt="Instagram Icon" className="IG-icon"/>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@fullhouse_shoes" target="_blank" rel="noopener noreferrer">
                    <img src={TTicon} alt="Instagram Icon" className="TK-icon"/>
                    </a>
                  </li>
                  <li>
                    <a href="https://api.whatsapp.com/send?phone=573147201104&text=Hola%20Full%20House%3F%20%0AMe%20encantaria%20saber%20sobre%20tus%20tenis!" target="_blank" rel="noopener noreferrer">
                    <img src={WPicon} alt="Instagram Icon" className="WP-icon"/>
                    </a>
                  </li>
                </ul>
              </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div className="privacy-container">
              <h2>Terminos y condiciones </h2>
              <Button variant="contained" className="button-politics" onClick={() => navigate("/terms")}>¡Conozca nuestras políticas!</Button>
            </div>
          </Grid>
        </Grid>
      </div>
      
    </footer>
    <div className="logo">
      <img src={Logo} alt="FullHouseIcon"/>
    </div>
    </div>
  );
};

export default Footer;
