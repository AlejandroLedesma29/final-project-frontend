
import React, { useState, useEffect } from "react";
import "./PQRSF.scss";
import MenuComponent from "../../components/menu/menu";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PqrsfForm } from "./form";

const Pqrsf = () => {
  const [activeButton, setActiveButton] = useState("PQRSF");

  return (
    <div className="Pqrsf-container">
      <div className="Pqrsf-container-header">
        <MenuComponent />
      </div>
      <div className="PQRSF">
        <div className="PQRSF-Form">
          <div className="PQRSF-Form-content">
            <div className="PQRSF-Form-content-title">
              <label className="PQRSF-Form-content-title-label">PQRSF</label>
            </div>
            <PqrsfForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pqrsf;
