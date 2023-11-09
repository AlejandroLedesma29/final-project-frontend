import React from "react";
import { images } from "../../assets";
import "./PostsList.scss";
import MenuReact from "../menu/MenuReact";
import { Menu1 } from "../menu/Menu1";

const posts = [
    {
      _id: "1",
      title: "Nuevos lanzamientos",
      subtitle:"¡Lo último de moda!",
      Description: "Descripción del servicio 1",
      avatar: images.post1,
    },
    {
      _id: "2",
      title: "Linea exclusiva",
      subtitle:"¡Productos que solo encuentras aquí!",
      Description: "Descripción del servicio 2",
      avatar: images.post2,
    },
    {
      _id: "3",
      title: "Colaboraciones",
      subtitle:"Colaboración de Adidas con BaddBunny",
      Description: "Descripción del servicio 3",
      avatar: images.post3,
    },
    {
      _id: "4",
      title: "Descuento del dia",
      subtitle:"Referencia de producto con descuento",
      Description: "Descripción del servicio 4",
      avatar: images.post4,
    }
  ];
export const PostsList = () => {
  return (
    <div className="services-page-content">
      {/* <MenuReact posts={posts}></MenuReact> */}
      <MenuReact posts = {posts}></MenuReact>
    </div>
  );
};
