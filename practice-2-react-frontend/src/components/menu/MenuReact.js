import React, { useEffect, useState } from "react";
import Fab from '@mui/material/Fab';
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./menu.scss";
import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/Logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { images } from "../../assets";
import ShoppingCar from "../shoppingCar/ShoppingCar"
import Footer from "../footer/Footer";
import Favorites from "../favorites/Favorites"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const posts = [
  {
    _id: "1",
    title: "Air Jordan SB",
    subtitle: "¡Lo último de moda!",
    Description: "¡Los Air Jordan SB combinan la elegancia de los Air Jordan con la funcionalidad de los Nike SB. Diseñados para los amantes del skate y el baloncesto, estos tenis ofrecen un rendimiento superior y un estilo inigualable!",
    avatar: images.post1,
  },
  {
    _id: "2",
    title: "Nike SB Dunk Low",
    subtitle: "♥♥ Para que disfrutes San Valentin ♥♥",
    Description: "¡Descubre el estilo clásico reinventado con los Nike SB Dunk Low. Con su diseño atemporal y comodidad inigualable, estos tenis son la elección perfecta para expresar tu individualidad y tu amor por el skateboarding!",
    avatar: images.post2,
  },
  {
    _id: "3",
    title: "Adidas Forum Bad Bunny",
    subtitle: "¡Colaboración de Adidas con BaddBunny!",
    Description: "¡Los Adidas Forum Bad Bunny son un tributo al icónico artista y a su estilo inconfundible. Estos tenis combinan a la perfección la herencia clásica de Adidas con el espíritu creativo de Bad Bunny. Perfectos para aquellos que buscan destacar en la multitud!",
    avatar: images.post4,
  },
  {
    _id: "4",
    title: "Jordan Retro Travis Scott Purple",
    subtitle: "¡Tuyos si eres alguien exclusivo!",
    Description: "¡Los Jordan 4 Retro Travis Scott Purple son una obra maestra de la colaboración entre Jordan Brand y el famoso rapero Travis Scott. Estos tenis destacan por su diseño único y colores vibrantes que te harán destacar en cualquier ocasión!",
    avatar: images.post3,
  },
];

export const MenuReact = () => {
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleOpen = (post_id) => {
    const post = posts.find((post) => post._id === post_id);
    setSelectedPost(post);
    setOpen(true);
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
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container">
      {/* Sección de iconos que se mostrará al desplazarse hacia abajo */}
      {showIcons && (
        <div className="icon-section">
          <a href="#" className="iconlist">
            <FontAwesomeIcon icon={faHome} />
          </a>

          <a href="#products1" className="iconlist">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </a>

          <a href="#contact1" className="iconlist">
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      )}

      <div className="menu">
        <img className="uamLogo" src={logo} alt="Logo UAM" />
        <button id="menu-toggle" className="menu-toggle">
          ☰
        </button>
        <ul id="menu-list">
          <li>
            <a href="#flex1">Cátalogo</a>
          </li>
          <li>
            <a href="#products1">Marcas</a>
          </li>
          <li>
            <a href="#contact1">Promociones</a>
          </li>
        </ul>
        <Button className="button-login" onClick={() => navigate("/login")}>Iniciar sesión</Button>
      </div>

      <div className="flex1" id="flex1">
        <div className="slider-container">
          <div className="slider-main">
            <Slider {...sliderSettings}>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div className="slider-content">
                    <img src={post.avatar} class="slidePic" />
                    <div className="slider-title">
                      <h2>{post.title}</h2>
                    </div>
                    <div className="slider-subtitle">
                      <h3>{post.subtitle}</h3>
                    </div>
                    <Button className="button-mas-info" onClick={() => handleOpen(post._id)}>
                      ¡Más información!
                    </Button>
                  </div>  
                ))
              ) : (
                <p>No hay servicios</p>
              )}
            </Slider>
          </div>
        </div>
      </div>

      <div className="products1" id="products1">
        <Favorites favoritesItems={likedProducts} />
      </div>
      <div className="contact1" id="contact1">
        <ShoppingCar cartItems={cartItems} />
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
                {selectedPost.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} className="title-modal">
                {selectedPost.subtitle}
              </Typography>
              {console.log(selectedPost)}
              <img
                src={selectedPost.avatar}
                alt={selectedPost.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedPost.Description}
              </Typography>
              <div className="button-fav-group">
                            <Fab
                              className="fab-button"
                              color="primary"
                              aria-label="Favorite icon"
                              onClick={() => addLikedProduct (selectedPost)}
                            >
                              <FavoriteIcon />
                            </Fab>
                            <Fab
                              className="shop-button"
                              color="seconday"
                              aria-label="Favorite icon"
                              onClick={() => addToCart(selectedPost)}
                            >
                              <AddShoppingCartIcon />
                            </Fab>
                          </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MenuReact;
