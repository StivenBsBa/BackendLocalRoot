const { Response } = require("../utils/Response");
const eventoModel = require("../models/EventosModels");
const eventoModelLIke = require("../models/LikeEventosModels");

module.exports.CreateEvento = async (user) => {
  return new Promise((resolve, reject) => {
    user
      .save()
      .then((resp) => {
        Response.status = 201;
        Response.message = "Se ha creado el evento Correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};
module.exports.CreateEventoLike = async (like) => {
  return new Promise((resolve, reject) => {
    like
      .save()
      .then((resp) => {
        Response.status = 201;
        Response.message = "Se ha agregado lugar a favoritos Correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.FindAllEvento = async (sort) => {
  return new Promise((resolve, reject) => {
    eventoModel.find()
      .sort(sort)
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros de los eventos Encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};
module.exports.FindOneEvento = async (id) => {
  return new Promise((resolve, reject) => {
    eventoModel.findById({ _id: id })
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros del evento encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.deleteEvento = async (id) => {
  return new Promise((resolve, reject) => {
    eventoModel.findByIdAndDelete(id)
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registro Eliminado correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.updateEvento = async (id, evento) => {
  return new Promise((resolve, reject) => {
    eventoModel.findOneAndUpdate({ _id: id }, {
      nombre: evento.nombre,
      fechaInicioEvento: evento.fechaInicioEvento,
      horaInicioEvento: evento.horaInicioEvento,
      fechaFinEvento: evento.fechaFinEvento,
      horaFinEvento: evento.horaFinEvento,
      ubicacion: evento.ubicacion,
      descripcion: evento.descripcion,
      categoria: evento.categoria,
      costoEntrada: evento.costoEntrada,
      contacto: evento.contacto,
      imageEvento: evento.imageEvento,
      organizador: evento.organizador
    })
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registro Actualizado correctamente";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};


module.exports.FindAllEventoscreados = async (Usuario) => {
  return new Promise((resolve, reject) => {
    eventoModel.find({usuario: Usuario })

      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros lugares creados  Encontrados";
        Response.result = resp;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 400;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};

module.exports.FindAllEventosLike = async (query) => {
  return new Promise((resolve, reject) => {
    eventoModelLIke.find(query)
      .populate({path:"idEventos"})
      .then((resp) => {
        const eventosGuardados = resp.map((like) => like.idEventos);
        Response.status = 200;
        Response.message = "Registros lugares guardados  Encontrados";
        Response.result = eventosGuardados;
        resolve(Response);
      })
      .catch((err) => {
        console.log("error:", err);
        Response.status = 500;
        Response.message = "Ocurrio un error en el servidor";
        Response.result = err;
        reject(Response);
      });
  });
};