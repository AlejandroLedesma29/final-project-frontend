import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import './ShoppingCar.scss';

const ShoppingCar = ({ cartItems }) => {
  return (
    <div>
      <div className='title-shopping-car'>
        <h1>Carrito de Compras</h1>
      </div>
      <div className="shopping-cart-container">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
          <Card key={item._id} className="shopping-cart-card">
            <CardMedia
              component="img"
              height="100"
              image={item.avatar}
              alt={item.title}
              className="card-image" 
            />
            <CardContent className="card-content"> 
              <Typography variant="h6" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.Description}
              </Typography>
            </CardContent>
          </Card>
        ))
          ) : (
            <p className="no-shopping-car-message">No tienes productos en el Carrito de compras aún</p>
          )}
      </div>
    </div>
  );
};

export default ShoppingCar;
