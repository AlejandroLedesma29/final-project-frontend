import React from "react";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import "./Footer.scss";
import locationicon from '../../assets/SVG/location-svgrepo-com.png'
import IGicon from '../../assets/SVG/instagram-svgrepo-com.png'
import TTicon from '../../assets/SVG/image.png'
import WPicon from '../../assets/SVG/whatsapp-svgrepo-com.png'
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <div className="direction-container">
              <h2>Ubicación</h2>
            <div className="direction">
              <div><h5>¡ Visítanos !</h5></div>
              <a href="https://www.google.com/maps/place/Portal+de+la+Florida/@5.0318045,-75.4847436,3a,75y,305.02h,78.2t/data=!3m6!1e1!3m4!1s7HeHZ9gYZWONFpSOzf1twQ!2e0!7i13312!8i6656!4m16!1m8!3m7!1s0x8e476508232bad0d:0xadcbf195699df3e!2sLa+Florida,+Villamar%C3%ADa,+Caldas!3b1!8m2!3d5.0311981!4d-75.4818806!16s%2Fg%2F11q25c8qnl!3m6!1s0x8e4765a7f7df21f1:0x1e6a013b302953a5!8m2!3d5.031207!4d-75.4818755!10e5!16s%2Fg%2F11dymcd65r?hl=es-ES&entry=ttu" target="_blank" rel="noopener noreferrer"><img src={locationicon} alt="Location Icon" className="location-icon"/>
              </a>
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
                    <img src={TTicon} alt="Instagram Icon" className="TT-icon"/>
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
  );
};

export default Footer;
