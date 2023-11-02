const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UsuariosSchema = schema({
    TipoUsuario: String,
    nombres: String,
    email: String,
    usuario: String,
    password: String,
    foto: String
});

module.exports = mongoose.model('usuarios_collection', UsuariosSchema);