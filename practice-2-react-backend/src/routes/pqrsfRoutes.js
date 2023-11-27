const express = require("express");
const pqrsfController = require("../controllers/pqrsf");

const routes = express.Router();

routes.post("/", pqrsfController.sendPQRSF);

module.exports = routes;
