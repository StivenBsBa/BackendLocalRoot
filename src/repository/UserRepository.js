const { Response } = require("../utils/Response");
const UserModel = require("../models/UsuariosModels");

module.exports.CreateUser = async (user) => {
  return new Promise((resolve, reject) => {
    user
      .save()
      .then((resp) => {
        Response.status = 201;
        Response.message = "Se ha creado el Usuario Correctamente";
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
module.exports.FindAllUser = async (sort) =>{
  return new Promise((resolve, reject) => {
      UserModel.find({ TipoUsuario: { $ne: "SuperAdministrador" } })
      .then((resp)=>{
          Response.status = 200;
          Response.message = "Registros Encontrados";
          Response.result = resp;
          resolve(Response);
      })
      .catch((err) =>{
          console.log("error:", err)
          Response.status = 500;
          Response.message = "Ocurrio un error en el servidor";
          Response.result = err;
          reject(Response);
      })
  });
}
module.exports.FindIdUser = async (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findById({ _id: id })
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros del usuario ncontrado";
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
 
module.exports.FindOneUsername = async (usuario) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ usuario: usuario })
      .then((resp) => {
        Response.status = 200;
        Response.message = "Registros Encontrados";
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

module.exports.updateUser = async (usuario, user) => {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { usuario: usuario },
      {
        nombres: user.nombres,
        email: user.email,
        usuario: user.usuario,
        password: user.password,
        TipoUsuario: user.TipoUsuario,
        foto: user.foto,
      }
    )
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
module.exports.deleteuser = async (usuario) => {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndDelete({usuario: usuario})
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