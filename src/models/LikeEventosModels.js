const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LikeEventosModels = schema({
    idEventos: {type: schema.ObjectId, ref:"Evento_collection"},
    Usuario: String
});


module.exports = mongoose.model('Likevento_collection', LikeEventosModels);