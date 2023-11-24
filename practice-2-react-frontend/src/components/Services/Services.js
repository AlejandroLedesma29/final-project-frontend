import React, { useEffect, useState } from "react";
import "./Services.scss";

import logo from "../../assets/images/Frank.png";
import cardInfo from "../../assets/images/infocard.jpg";
import PQRSpic from "../../assets/images/PQRSpic.jpg";
import tiempoEntrega from "../../assets/images/tiempo.jpg";
import discount from "../../assets/images/descuentos.jpg";
import quality from "../../assets/images/quality.jpg";
import global from "../../assets/images/global.jpg";
import tiempoespera from "../../assets/images/tiempoespera.jpg";
import talla from "../../assets/images/talla.jpg";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Services = () => {
  const categories = [
    {
      categoryId: "1",
      categoryName: "Información",
      categoryDescription:
        "Información general sobre nuestros productos y sobre quien es FullHouse",
      categoryImg: cardInfo,
      active: true,
    },
    {
      categoryId: "2",
      categoryName: "Preguntas frecuentes",
      categoryDescription:
        "Podrás encontrar las dudas o inquietudes que generalmente se presentan",
      categoryImg: PQRSpic,
      active: true,
    },
    {
      categoryId: "3",
      categoryName: "Tiempo de entrega",
      categoryDescription:
        "Debes tener en cuenta los tiempos de entrega que manejamos",
      categoryImg: tiempoEntrega,
      active: false,
    },
    {
      categoryId: "4",
      categoryName: "Descuentos",
      categoryDescription:
        "Encuentra como puedes ser participe de algún descuento y que deberes tienes para reclamarlo",
      categoryImg: discount,
      active: false,
    },
  ];

  const services = [
    {
      serviceId: "1",
      categoryId: "1",
      serviceName: "¿Quienes somos?",
      serviceDescription:
        "En FullHouse, no solo vendemos tenis, vendemos un estilo de vida lleno de comodidad y tendencia. ¡Únete a nosotros y experimenta la excelencia en calzado!",
      serviceImg: logo,
      active: true,
    },
    {
      serviceId: "2",
      categoryId: "1",
      serviceName: "Calidad",
      serviceDescription:
        "Nuestra misión es vestir tus pies con los últimos diseños y tecnologías de calzado, brindándote una experiencia de compra excepcional respaldada por nuestra promesa de 'Top Quality'.",
      serviceImg: quality,
      active: true,
    },
    {
      serviceId: "3",
      categoryId: "1",
      serviceName: "Alcance",
      serviceDescription:
        "Únete a nuestra comunidad global de entusiastas del calzado y descubre cómo FullHouse hace que la moda y la calidad estén al alcance de todos, sin importar la ubicación geográfica. ",
      serviceImg: global,
      active: true,
    },
    {
      serviceId: "4",
      categoryId: "2",
      serviceName: "¿Cuánto tiempo se demoran en llegar tus tenis?",
      serviceDescription:
        "¡¡Tú compra se tarda en llegar a tus manos de 3 a 5 dias hábiles, lo bueno se deja esperar!!",
      serviceImg: tiempoespera,
      active: true,
    },
    {
      serviceId: "5",
      categoryId: "2",
      serviceName: "¿Si la talla no es la indicada?",
      serviceDescription:
        "FullHouse se encarga de tu satisfacción, de no ser la talla correcta, nos encargaremos de todos los costos que signifiquen cambiar tu producto.",
      serviceImg: talla,
      active: true,
    },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showServices, setShowServices] = useState(false);

  const handleOpenServices = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
  };

  const handleCloseServices = () => {
    setShowServices(false);
  };

  const categoryOfService = services.filter(
    (service) => service.categoryId === selectedCategoryId
  );

  return (
    <div className="main-cards">
      <div className="categoryCards">
        {categories.map((category) => {
          if (category.active) {
            return (
              <div className="card">
                <Card
                  sx={{ maxWidth: 345 }}
                  key={category.categoryId}
                  className="card"
                  onClick={() => handleOpenServices(category.categoryId)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={category.categoryImg}
                      alt="card"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {category.categoryName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.categoryDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          }
        })}
      </div>
      <div className="secondaryCards">
        {categoryOfService.map((service) => {
          if (service.active) {
            return (
              <div className="servicecard">
                <Card
                  sx={{ maxWidth: 345 }}
                  key={service.serviceId}
                  className="card"
                  onClick={() => handleCloseServices()}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={service.serviceImg}
                      alt="card"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {service.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.serviceDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Services;
