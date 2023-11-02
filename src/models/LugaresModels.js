const mongoose = require("mongoose");
const schema = mongoose.Schema;

const EventosSchema = schema({
  usuario: String,
  nombreLugar: String,
  categoriaLugar: [],
  direccionLugar: String,
  horarioLugar: String,
  descripcionLugar: String,
  atraccionesLugar: String,
  contactoLugar: String,
  fotosLugar: String,
});

module.exports = mongoose.model("Lugares_collection", EventosSchema);
