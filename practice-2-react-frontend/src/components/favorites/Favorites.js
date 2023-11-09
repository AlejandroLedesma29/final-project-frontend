import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import './Favorites.scss';

const Favorites = ({ favoritesItems }) => {
  return (
    <div>
      <div className='title-favorites'>
        <h1>Productos que te gustan</h1>
      </div>
      <div className="shopping-favorites-container">
        {favoritesItems.length > 0 ? (
        favoritesItems.map((item) => (
          <Card key={item._id} className="shopping-favorites-card">
            <CardMedia
              component="img"
              height="100"
              image={item.avatar}
              alt={item.title}
              className="card-image-favorites" 
            />
            <CardContent className="card-content-favorites"> 
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
            <p className="no-likes-message">No tienes productos que te gusten aún.</p>
         )}
      </div>
    </div>
  );
};

export default Favorites;
