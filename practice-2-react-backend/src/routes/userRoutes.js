const express = require("express");
const userController = require("../controllers/user");
const { asureAuth } = require("../middlewares/authenticated");

const routes = express.Router();

routes.post("/",asureAuth, userController.createUser);
routes.get("/",asureAuth, userController.listUsers);
routes.get("/me",asureAuth, userController.listMe);
routes.get("/activate/:userId", userController.activation);
routes.get("/:userId",asureAuth, userController.listUser);
routes.patch("/deactivate",asureAuth, userController.deactivate);
routes.patch("/",asureAuth, userController.editMe);
routes.patch("/resetPassword/:userId",asureAuth, userController.resetPassword);
routes.patch("/:userId",asureAuth, userController.editUser);
routes.delete("/:userId",asureAuth, userController.deleteUser);

module.exports = routes;
