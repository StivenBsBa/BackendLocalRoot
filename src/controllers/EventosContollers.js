const eventoModel = require("../models/EventosModels");
const LikeModelEventos = require("../models/LikeEventosModels");
 
const {
  CreateEvento,
  CreateEventoLike,
  FindAllEvento,
  FindOneEvento,
  FindOneEventoname,
  deleteEvento,
  updateEvento,
  FindAllEventoscreados,
  FindAllEventosLike
} = require("../repository/EventosRepository");

async function create(req, res) {
  const params = req.body;

  const evento = new eventoModel();

  evento.usuario = params.usuario;
  evento.nombre = params.nombre;
  evento.fechaInicioEvento = params.fechaInicioEvento;
  evento.horaInicioEvento = params.horaInicioEvento;
  evento.fechaFinEvento = params.fechaFinEvento;
  evento.horaFinEvento = params.horaFinEvento;
  evento.ubicacion = params.ubicacion;
  evento.descripcion = params.descripcion;
  evento.categoria = params.categoria;
  evento.costoEntrada = params.costoEntrada;
  evento.contacto = params.contacto;
  evento.imageEvento = params.imageEvento;
  evento.organizador = params.organizador;

  const response = await CreateEvento(evento);
  res.status(response.status).send(response);
}

async function findAll(req, res) {
  const sort = req.params["sort"];

  const query = { nombres: sort };

  const response = await FindAllEvento(query);
  res.status(response.status).send(response);
}

async function findById(req, res) {
  const id = req.params["id"];
  const response = await FindOneEvento(id);
  res.status(response.status).send(response);
}
async function findAllcreados(req, res) {
  const Usuario = req.params["Usuario"];
  const response = await FindAllEventoscreados(Usuario);
  res.status(response.status).send(response);
}
async function findAlllike(req, res) {
  const usuario = req.params["usuario"];
  const query = { Usuario: usuario };
  const response = await FindAllEventosLike(query);
  res.status(response.status).send(response);
}

async function findOneEvento(req, res) {
  const evento = req.params["userevento"];
  const response = await FindOneEventoname(evento);
  res.status(response.status).send(response);
}

async function deleteEventoData(req, res) {
  const id = req.params["id"];
  const response = await deleteEvento(id);
  res.status(response.status).send(response);
}

async function updateEventoData(req, res) {
  const id = req.params["id"];
  const body = req.body;

  let evento = new eventoModel();
  evento.nombre = body.nombre;
  evento.fechaInicioEvento = body.fechaInicioEvento;
  evento.horaInicioEvento = body.horaInicioEvento;
  evento.fechaFinEvento = body.fechaFinEvento;
  evento.horaFinEvento = body.horaFinEvento;
  evento.ubicacion = body.ubicacion;
  evento.descripcion = body.descripcion;
  evento.categoria = body.categoria;
  evento.costoEntrada = body.costoEntrada;
  evento.contacto = body.contacto;
  evento.imageEvento = body.imageEvento;
  evento.organizador = body.organizador;

  const response = await updateEvento(id, evento);
  res.status(response.status).send(response);
}

async function CreateEventolike(req, res) {
  const params = req.body;

  const like = new LikeModelEventos();

  like.Usuario = params.Usuario;
  like.idEventos = params.idEventos;
  const response = await CreateEventoLike(like);
  res.status(response.status).send(response);
}

module.exports = {
  create,
  CreateEventolike,
  findAll,
  findById,
  findAllcreados,
  findAlllike,
  findOneEvento,
  deleteEventoData,
  updateEventoData,
};
