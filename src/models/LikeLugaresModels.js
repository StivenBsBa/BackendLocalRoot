const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LikeLugaresModels = schema({
    idLugares: {type: schema.ObjectId, ref:"Lugares_collection"},
    Usuario: String
});


module.exports = mongoose.model('LikeLugares_collection', LikeLugaresModels);