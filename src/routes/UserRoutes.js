const express = require("express")
const UsersController = require("../controllers/UsuariosController");
const EventosController = require("../controllers/EventosContollers");
const LugaresController = require("../controllers/LugaresControllers");

const api = express.Router();
// Routes para usuarios
api.post("/usuarios/loginUser", UsersController.login);
api.post("/usuarios/createUser", UsersController.create);
api.get("/usuarios/listUser", UsersController.findAll);
api.get("/usuarios/findusername/:username", UsersController.findOneUsuario);
api.delete("/usuarios/deleteUser/:usuario", UsersController.deleteUserData);
api.put("/usuarios/updateUserPassword/:usuario", UsersController.updateUserDataPassword);
api.put("/usuarios/updateUser/:usuario", UsersController.updateUserData);
api.put("/usuarios/updateTipoUser/:usuario", UsersController.updateTipoUser);
api.get("/usuarios/findbyidUser/:id", UsersController.findById);

// Routes para crear eventos
api.post("/eventos/createEvento", EventosController.create);
api.post("/eventos/createEventoLike", EventosController.CreateEventolike);
api.get("/eventos/listEvento", EventosController.findAll);
api.get("/eventos/findbyidEvento/:id", EventosController.findById);
api.get("/eventos/listEventoscreados/:Usuario", EventosController.findAllcreados);
api.get("/eventos/listEventosLike/:usuario", EventosController.findAlllike);
api.delete("/eventos/deleteEvento/:id", EventosController.deleteEventoData);
api.delete("/eventos/deleteEventosLike/", EventosController.deleteeventoDataLike);

api.put("/eventos/updateEvento/:id", EventosController.updateEventoData);


// Routes para crear lugares
api.post("/lugares/createLugares", LugaresController.create);
api.post("/lugares/createLugareLike", LugaresController.Createlugarlike);
api.get("/lugares/listlugares", LugaresController.findAll);
api.get("/lugares/findbyidlugares/:id", LugaresController.findById);
api.get("/lugares/listlugarescreados/:Usuario", LugaresController.findAllcreados);
api.get("/lugares/listlugaresLike/:usuario", LugaresController.findAlllike);
api.delete("/lugares/deletelugares/:id", LugaresController.deleteLugarData);
api.delete("/lugares/deleteLugarLike", LugaresController.deleteLugarDataLike);
api.put("/lugares/updateLugares/:id", LugaresController.updateLugarData);
module.exports = api;