const mongoose = require('mongoose');
const schema = mongoose.Schema;

const EventosSchema = schema({
    usuario: String,
    nombre: String,
    fechaInicioEvento: String,
    horaInicioEvento: String,
    fechaFinEvento: String,
    horaFinEvento: String,
    ubicacion: String,
    descripcion: String,
    categoria: [],
    costoEntrada: String,
    contacto: String,
    imageEvento: String,
    organizador: String
});


module.exports = mongoose.model('Evento_collection', EventosSchema);