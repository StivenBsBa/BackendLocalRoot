const eventoModel = require("../models/EventosModels");
const eventoModelLIke = require("../models/LikeEventosModels");

const {
  CreateEvento,
  CreateEventoLike,
  FindAllEvento,
  FindOneEvento,
  deleteEvento,
  deleteEventoLike,
  updateEvento,
  FindAllEventoscreados,
} = require("../repository/EventosRepository");

describe("Test Eventos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Shoul CreateEvento  response ok", async () => {
    const evento = new eventoModel();
    evento.usuario = "test usuario";
    evento.nombre = "test nombre";
    evento.fechaInicioEvento = "test fechaInicioEvento";
    evento.horaInicioEvento = "test horaInicioEvento";
    evento.fechaFinEvento = "test fechaFinEvento";
    evento.horaFinEvento = "test horaFinEvento";
    evento.ubicacion = "test ubicacion";
    evento.descripcion = "test descripcion";
    evento.categoria = ["test categoria"];
    evento.costoEntrada = "test costoEntrada";
    evento.contacto = "test contacto";
    evento.imageEvento = "test imageEvento";
    evento.organizador = "test organizador";

    jest
      .spyOn(evento, "save")
      .mockImplementationOnce((evento) => Promise.resolve(evento));

    const result = await CreateEvento(evento);
    console.log(result);
    expect(result.status).toBe(201);
    expect(result.message).toBe("Se ha creado el evento Correctamente");
  });

  it("Shoul CreateEvento  response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const evento = new eventoModel();
    evento.usuario = "test usuario";
    evento.nombre = "test nombre";
    evento.fechaInicioEvento = "test fechaInicioEvento";
    evento.horaInicioEvento = "test horaInicioEvento";
    evento.fechaFinEvento = "test fechaFinEvento";
    evento.horaFinEvento = "test horaFinEvento";
    evento.ubicacion = "test ubicacion";
    evento.descripcion = "test descripcion";
    evento.categoria = ["test categoria"];
    evento.costoEntrada = "test costoEntrada";
    evento.contacto = "test contacto";
    evento.imageEvento = "test imageEvento";
    evento.organizador = "test organizador";

    jest
      .spyOn(evento, "save")
      .mockImplementationOnce((evento) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await CreateEvento(evento);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrio un error en el servidor");
    }
  });

  it("Shoul CreateEventoLike  response ok", async () => {
    const eventoLike = new eventoModelLIke();
    eventoLike.idEventos = "test idEventos";
    eventoLike.usuario = "test usuario";

    jest
      .spyOn(eventoLike, "save")
      .mockImplementationOnce((evento) => Promise.resolve(evento));

    const result = await CreateEventoLike(eventoLike);
    console.log(result);
    expect(result.status).toBe(201);
    expect(result.message).toBe(
      "Se ha agregado lugar a favoritos Correctamente"
    );
  });

  it("Shoul CreateEventoLike  response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const eventoLike = new eventoModelLIke();
    eventoLike.idEventos = "test idEventos";
    eventoLike.usuario = "test usuario";

    jest
      .spyOn(eventoLike, "save")
      .mockImplementationOnce((evento) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await CreateEventoLike(eventoLike);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrio un error en el servidor");
    }
  });

  it("Should FindAllEvento Response ok", async () => {
    jest
      .spyOn(eventoModel, "find")
      .mockReturnValue(Promise.resolve([{ nombre: "flores" }]));

    const expected = await FindAllEvento();
    console.log(expected);
    expect(expected.status).toBe(200);
  });

  it("Should FindAllEvento response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    jest
      .spyOn(eventoModel, "find")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindAllEvento();
    } catch (error) {
      expect(error.status).toEqual(500);
    }
  });

  it("Shoul FindOneEvento  response ok", async () => {
    const eventoId = "123";
    const evento = { _id: eventoId, name: "User1", usuario: "user1" };

    jest
      .spyOn(eventoModel, "findOne")
      .mockImplementationOnce((userId) => Promise.resolve(evento));

    const result = await FindOneEvento(eventoId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registros del evento encontrados");
    expect(result.result).toEqual(evento);
  });

  it("Shoul FindOneEvento response Fail", async () => {
    const eventoId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(eventoModel, "findOne")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindOneEvento(eventoId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul deleteEvento response ok", async () => {
    const eventoId = "123";
    const evento = { _id: eventoId, name: "User1", usuario: "user1" };

    jest
      .spyOn(eventoModel, "findByIdAndDelete")
      .mockImplementationOnce((userId) => Promise.resolve(evento));

    const result = await deleteEvento(eventoId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Eliminado correctamente");
    expect(result.result).toEqual(evento);
  });

  it("Shoul deleteEvento response Fail", async () => {
    const eventoId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(eventoModel, "findByIdAndDelete")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await deleteEvento(eventoId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul deleteEventoLike response ok", async () => {
    const eventoId = "123";
    const evento = { _id: eventoId, name: "User1", usuario: "user1" };

    jest
      .spyOn(eventoModelLIke, "findOneAndRemove")
      .mockImplementationOnce((userId) => Promise.resolve(evento));

    const result = await deleteEventoLike(eventoId);

    expect(result.status).toBe(200);
    expect(result.message).toBe(
      "Registro Eliminado de favoritos correctamente"
    );
    expect(result.result).toEqual(evento);
  });

  it("Shoul deleteEventoLike response Fail", async () => {
    const eventoId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(eventoModelLIke, "findOneAndRemove")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await deleteEventoLike(eventoId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul updateEvento response ok", async () => {
    const eventoId = "6543b573ac43fa00d09278bc";
    const evento = new eventoModel();
    evento.descripcion = "test descripcion";
    evento.categoria = ["test categoria"];
    evento.costoEntrada = "test costoEntrada";
    evento.imageEvento = "test imageEvento";

    jest
      .spyOn(eventoModel, "findOneAndUpdate")
      .mockImplementationOnce((userId, user) => Promise.resolve(user));

    const result = await updateEvento(eventoId, evento);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Actualizado correctamente");
  });

  it("Shoul updateEvento response Fail", async () => {
    const eventoId = "6543b573ac43fa00d09278bc";
    const expectedErrorData = { errorMessage: "test error scenario" };
    const evento = new eventoModel();
    evento.descripcion = "test descripcion";
    evento.categoria = ["test categoria"];
    evento.costoEntrada = "test costoEntrada";
    evento.imageEvento = "test imageEvento";

    jest
      .spyOn(eventoModel, "findOneAndUpdate")
      .mockImplementationOnce((userId, user) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await updateEvento(eventoId, evento);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Should FindAllEventoscreados Response ok", async () => {
    jest
      .spyOn(eventoModel, "find")
      .mockReturnValue(Promise.resolve([{ nombre: "flores" }]));

    const expected = await FindAllEventoscreados();
    console.log(expected);
    expect(expected.status).toBe(200);
  });
});
