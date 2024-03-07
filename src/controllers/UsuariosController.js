const UserModel = require("../models/UsuariosModels");
const {
  CreateUser,
  FindAllUser,
  FindOneUsername,
  updateUser,
  FindIdUser
} = require("../repository/UserRepository");
const bcrypt = require("bcrypt-nodejs");

async function create(req, res) {
  const params = req.body;
  const user = new UserModel();

  if (params.nombres == "" || params.nombres == undefined) {
    res.status(400).send({ message: "El nombre es Requerido" });
    return;
  }
  if (params.usuario == "" || params.usuario == undefined) {
    res.status(400).json({ message: "El Usuario es Requerido" });
    return;
  }
  if (params.email == "" || params.email == undefined) {
    res.status(400).send({ message: "El Email es Requerido" });
    return;
  }

  function esCorreoElectronicoValido(correo) {
    const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patronCorreo.test(correo);
  }

  if (!esCorreoElectronicoValido(params.email)) {
    res.status(400).send({ message: "El Email ingresado no es válido" });
    return;
  }

  if (params.password == "" || params.password == undefined) {
    res.status(400).send({ message: "La contraseña es Requerida" });
    return;
  }

  // comprobar si hay existencia de usaurio o email
  const userExiste = await FindOneUsername(params.usuario);
  if (userExiste.result) {
    res
      .status(400)
      .send({ message: "El usuario ya existe, ingresa uno diferente" });
    return;
  }

  const emailExiste = await FindOneUsername(params.email);
  if (emailExiste.result) {
    res.status(400).send({ message: "El Email ya existe" });
    return;
  }

  //Encriptar
  bcrypt.hash(params.password, null, null, async function (err, hash) {
    if (hash) {
      user.TipoUsuario = "Cliente";
      user.nombres = params.nombres;
      user.email = params.email;
      user.usuario = params.usuario;
      user.foto = params.foto;
      user.password = hash;

      const response = await CreateUser(user);
      res.status(response.status).send(response);
    }
  });
}

async function findAll(req, res) {
  const sort = req.params["sort"];
  const query = { nombres: sort };
  const response = await FindAllUser(query);
  res.status(response.status).send(response);
}

async function findOneUsuario(req, res) {
  const username = req.params["username"];
  const response = await FindOneUsername(username);
  res.status(response.status).send(response);
}

async function deleteUserData(req, res) {
  const usuario = req.params["usuario"];
  const response = await FindOneUsername(usuario);
  res.status(response.status).send(response);
}

async function updateUserDataPassword(req, res) {
  const params = req.body;
  const userExiste = await FindOneUsername(params.usuario);
  if (userExiste.result) {
    const usuario = req.params["usuario"];
    const body = req.body;

    let user = new UserModel();
    user.password = body.password;
    bcrypt.hash(user.password, null, null, async function (err, hash) {
      if (hash) {
        user.password = hash;
        const response = await updateUser(usuario, user);
        res.status(response.status).send(response);
      }
    });
  } else {
    res.status(400).send({ message: "Usuario  Invalido" });
  }
}
async function updateUserData(req, res) {
  const params = req.body;
  const userExiste = await FindOneUsername(params.usuario);
  if (userExiste.result) {
    const usuario = req.params["usuario"];
    const body = req.body;

    function esCorreoElectronicoValido(correo) {
      const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return patronCorreo.test(correo);
    }

    if (!esCorreoElectronicoValido(params.email)) {
      res.status(400).send({ message: "El Email ingresado no es válido" });
      return;
    }

    const emailExiste = await FindOneUsername(params.email);
    if (emailExiste.result) {
      res.status(400).send({ message: "El Email ya existe" });
      return;
    }

    let user = new UserModel();
    user.password = body.password;

    user.nombres = body.nombres;

    user.email = body.email;
    user.usuario = body.usuario;

    user.foto = body.foto;
    const response = await updateUser(usuario, user);
    res.status(response.status).send(response);
  } else {
    res.status(400).send({ message: "Usuario  Invalido" });
  }
}

async function login(req, res) {
  const params = req.body;
  const user = await FindOneUsername(params.usuario);
  if (user.result && user.result.password) {
    //Logueo
    bcrypt.compare(
      params.password,
      user.result.password,
      function (err, check) {
        if (check) {
          res.status(200).send({ message: "el usuario se encuentra logueado" });
        } else {
          res.status(400).send({ message: "Usuario o contraseña Invalida 1" });
        }
      }
    );
  } else {
    res.status(400).send({ message: "Usuario o contraseña Invalida" });
  }
}

async function findById(req, res) {
  const id = req.params["id"];
  const response = await FindIdUser(id);
  res.status(response.status).send(response);
}

module.exports = {
  create,
  findAll,
  findOneUsuario,
  deleteUserData,
  updateUserDataPassword,
  updateUserData,
  login,
  findById
};
