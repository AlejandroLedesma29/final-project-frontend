import React, { useEffect, useState } from "react";
import "./menuReact.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Footer from "../footer/Footer";
import MenuComponent from "./menu";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
const avatars = require.context('../../assets/images/Productsphotos', false, /\.(png|jpe?g|svg)$/);

export const MenuReact = () => {
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleOpen = (post_id) => {
    const post = productsData.find((post) => post._id === post_id);
    setSelectedPost(post);
    setOpen(true);
  };
  const [productsData, setProductsData] = useState([]);
  const [productsSliderData, setProductsSliderData] = useState([]);
  const [productsTrendsData, setProductsTrendsData] = useState([]);
  const [productsNewsData, setProductsNewsData] = useState([]);

  const getProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/product", {});

      const Slider = response.data.filter((image) => image.category === "656ca8a350e4b79fba590341");
      setProductsSliderData(Slider);

      const Trends = response.data.filter((image) => image.category === "656c9f8a50e4b79fba59033e");
      setProductsTrendsData(Trends);

      const News = response.data.filter((image) => image.category === "656cbf4b50e4b79fba590344");
      setProductsNewsData(News);

      setProductsData(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const exists = prevCartItems.some((item) => item._id === product._id);
      if (!exists) {
        const updatedCart = [...prevCartItems, product];
        console.log("Carrito de compras:", updatedCart);
        return updatedCart;
      }
      return prevCartItems;
    });
  };

  const [likedProducts, setLikedProducts] = useState([]);
  const addLikedProduct = (product) => {
    setLikedProducts((prevLikedProducts) => {
      const exists = prevLikedProducts.some((item) => item._id === product._id);
      if (!exists) {
        const updatedLikedProducts = [...prevLikedProducts, product];
        console.log("Productos que les gustan:", updatedLikedProducts);
        return updatedLikedProducts;
      }
      return prevLikedProducts;
    });
  };

  

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleMenuToggle = () => {
      const menuList = document.getElementById("menu-list");
      menuList.classList.toggle("show-menu");
    };
    getProductsData();
    const handleResize = () => {
      if (window.innerWidth > 530) {
        const menuList = document.getElementById("menu-list");
        menuList.classList.remove("show-menu");
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      const minHeightToShowIcons = 100;

      if (scrollY > minHeightToShowIcons) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
      }
    };

    const menuToggle = document.getElementById("menu-toggle");
    menuToggle.addEventListener("click", handleMenuToggle);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      menuToggle.removeEventListener("click", handleMenuToggle);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#333" }}
        onClick={onClick}
      />
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#333" }}
        onClick={onClick}
      />
    );
  };

  
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container">
      {/* Sección de iconos que se mostrará al desplazarse hacia abajo */}
      {showIcons && (
        <div className="icon-section">
          <a href="#" className="iconlist">
            <HomeIcon />
          </a>

          <a href="#news" className="iconlist">
            <NewReleasesIcon />
          </a>

          <a href="#trends" className="iconlist">
            <WhatshotIcon />
          </a>
        </div>
      )}

      <MenuComponent/>

      <div className="home" id="home">
      
      <div className="split-layout">
        <div className="left-drawer">
          <h1 className="title-slider-main">Productos Destacados</h1>
        </div>

        <div className="slider-container">
            <Slider {...sliderSettings}>
              {productsSliderData.length > 0 ? (
                productsSliderData.map((product) => (
                  <div className="slider-content" key={product._id}>
                    <h1>{product.name}</h1>
                    <img
                      src={avatars.keys().includes(`./${product.photo1}`)
                        ? avatars(`./${product.photo1}`)
                        : require('../../assets/images/Frank.png')}
                      className={`slidePic limited-size`}
                      onClick={() => handleOpen(product._id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                ))
              ) : (
                <p>No hay servicios</p>
              )}
            </Slider>
        </div>
      </div>

        
      </div>

    <div className="news" id="news">
    <h1 className="trend-title">Últimas Novedades</h1>
      <Box className="product-container">
        {productsNewsData && productsNewsData.map((product) => (
          <div key={product._id} className="product-thumbnail" onClick={() => handleOpen(product._id)}>
            <img src={avatars.keys().includes(`./${product.photo1}`) ? avatars(`./${product.photo1}`) : require('../../assets/images/Frank.png')} alt={product.name} />
            <p>{product.name}</p>
            <p>Precio: ${product.price}</p>
          </div>
        ))}
      </Box>
    </div>


      <div className="trends" id="trends">
      <h1 className="trend-title">Productos Tendencia</h1>
        <Box className="product-container">
          {productsTrendsData && productsTrendsData.map((product) => (
            <div key={product._id} className="product-thumbnail" onClick={() => handleOpen(product._id)}>
              <img src={avatars.keys().includes(`./${product.photo1}`) ? avatars(`./${product.photo1}`) : require('../../assets/images/Frank.png')} alt={product.name} />
              <p>{product.name}</p>
              <p>Precio: ${product.price}</p>
            </div>
          ))}
        </Box>
      </div>
      
      <div className="footer">
      <Footer/>
      </div>



      <Modal
        className="modal-style"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-style">
          {selectedPost && (
            <>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="title-modal">
                {selectedPost.name}
              </Typography>
              <img
                src={avatars.keys().includes(`./${selectedPost.photo1}`) ? avatars(`./${selectedPost.photo1}`) : require('../../assets/images/Frank.png')}
                alt={selectedPost.title}
                style={{ width: "300px", height: "auto"}}
              />
              
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedPost.description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Precio: ${selectedPost.price}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MenuReact;
