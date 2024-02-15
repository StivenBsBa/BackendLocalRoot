// Librerias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const UsuariosRoutes = require("./src/routes/UserRoutes");

const app = express();

// Datos codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));

// Analiza objeto JSON
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);

app.get('/status', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Servidor Corriendo'
  });
});

// Conexion a base de datos
const MONGODB_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.MONGO_DB}`;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Base de Datos Conectada");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Detener la aplicación si hay un error de conexión
  });

// Setting Routes
app.use("/api", UsuariosRoutes);

// Export
module.exports = app;

