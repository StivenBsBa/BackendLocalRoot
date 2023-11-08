const lugarModel = require("../models/LugaresModels");
const lugarModelLIke = require("../models/LikeLugaresModels");

const {
  CreateLugar,
  CreateLugarLike,
  FindAllLugar,
  FindOneLugar,
  deleteLugar,
  deleteLugarLike,
  updateLugar,
  FindAllLugarcreados,
} = require("../repository/LugaresRepositoty");

describe("Test Eventos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Shoul CreateLugar  response ok", async () => {
    const lugar = new lugarModel();
    lugar.usuario = "test usuario";
    lugar.nombreLugar = "test nombre";
    lugar.categoriaLugar = [" teste categoria"];
    lugar.direccionLugar = "test dirección";
    lugar.horarioLugar = "test horario";
    lugar.descripcionLugar = "test descripción";
    lugar.atraccionesLugar = "test atracciones";
    lugar.contactoLugar = "test contacto";
    lugar.fotosLugar = "test fotos";

    jest
      .spyOn(lugar, "save")
      .mockImplementationOnce((evento) => Promise.resolve(evento));

    const result = await CreateLugar(lugar);
    console.log(result);
    expect(result.status).toBe(201);
    expect(result.message).toBe("Se ha creado el lugar Correctamente");
  });

  it("Shoul CreateLugar  response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const lugar = new lugarModel();
    lugar.usuario = "test usuario";
    lugar.nombreLugar = "test nombre";
    lugar.categoriaLugar = [" teste categoria"];
    lugar.direccionLugar = "test dirección";
    lugar.horarioLugar = "test horario";
    lugar.descripcionLugar = "test descripción";
    lugar.atraccionesLugar = "test atracciones";
    lugar.contactoLugar = "test contacto";
    lugar.fotosLugar = "test fotos";

    jest
      .spyOn(lugar, "save")
      .mockImplementationOnce((lugar) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await CreateLugar(lugar);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrio un error en el servidor");
    }
  });

  it("Shoul CreateLugarLike  response ok", async () => {
    const lugarLike = new lugarModelLIke();
    lugarLike.idLugares = "test idLugares";
    lugarLike.usuario = "test usuario";

    jest
      .spyOn(lugarLike, "save")
      .mockImplementationOnce((evento) => Promise.resolve(evento));

    const result = await CreateLugarLike(lugarLike);
    console.log(result);
    expect(result.status).toBe(201);
    expect(result.message).toBe(
      "Se ha agregado lugar a favoritos Correctamente"
    );
  });

  it("Shoul CreateLugarLike  response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const lugarLike = new lugarModelLIke();
    lugarLike.idLugares = "test idLugares";
    lugarLike.usuario = "test usuario";

    jest
      .spyOn(lugarLike, "save")
      .mockImplementationOnce((evento) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await CreateLugarLike(lugarLike);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrio un error en el servidor");
    }
  });

  it("Should FindAllLugar Response ok", async () => {
    jest
      .spyOn(lugarModel, "find")
      .mockReturnValue(Promise.resolve([{ nombre: "flores" }]));

    const expected = await FindAllLugar();
    console.log(expected);
    expect(expected.status).toBe(200);
  });

  it("Should FindAllLugar response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    jest
      .spyOn(lugarModel, "find")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindAllLugar();
    } catch (error) {
      expect(error.status).toEqual(500);
    }
  });

  it("Shoul FindOneLugar  response ok", async () => {
    const lugarId = "123";
    const lugar = { _id: lugarId, name: "User1", usuario: "user1" };

    jest
      .spyOn(lugarModel, "findOne")
      .mockImplementationOnce((userId) => Promise.resolve(lugar));

    const result = await FindOneLugar(lugarId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registros del evento encontrados");
    expect(result.result).toEqual(lugar);
  });

  it("Shoul FindOneLugar response Fail", async () => {
    const lugarId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(lugarModel, "findOne")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindOneLugar(lugarId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul deleteLugar response ok", async () => {
    const lugarId = "123";
    const lugar = { _id: lugarId, name: "User1", usuario: "user1" };

    jest
      .spyOn(lugarModel, "findByIdAndDelete")
      .mockImplementationOnce((userId) => Promise.resolve(lugar));

    const result = await deleteLugar(lugarId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Eliminado correctamente");
    expect(result.result).toEqual(lugar);
  });

  it("Shoul deleteLugar response Fail", async () => {
    const lugarId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(lugarModel, "findByIdAndDelete")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await deleteLugar(lugarId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul deleteLugarLike response ok", async () => {
    const lugarId = "123";
    const lugar = { _id: lugarId, name: "User1", usuario: "user1" };

    jest
      .spyOn(lugarModelLIke, "findOneAndRemove")
      .mockImplementationOnce((userId) => Promise.resolve(lugar));

    const result = await deleteLugarLike(lugarId);

    expect(result.status).toBe(200);
    expect(result.message).toBe(
      "Registro Eliminado de favoritos correctamente"
    );
    expect(result.result).toEqual(lugar);
  });

  it("Shoul deleteLugarLike response Fail", async () => {
    const lugarId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(lugarModelLIke, "findOneAndRemove")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await deleteLugarLike(lugarId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul updateLugar response ok", async () => {
    const lugarId = "6543b573ac43fa00d09278bc";
    const lugar = new lugarModel();
    lugar.nombreLugar = "test nombre";
    lugar.categoriaLugar = [" teste categoria"];
    lugar.direccionLugar = "test dirección";

    jest
      .spyOn(lugarModel, "findOneAndUpdate")
      .mockImplementationOnce((userId, user) => Promise.resolve(user));

    const result = await updateLugar(lugarId, lugar);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Actualizado correctamente");
  });

  it("Shoul updateEvento response Fail", async () => {
    const lugarId = "6543b573ac43fa00d09278bc";
    const expectedErrorData = { errorMessage: "test error scenario" };
    const lugar = new lugarModel();
    lugar.nombreLugar = "test nombre";
    lugar.categoriaLugar = [" teste categoria"];
    lugar.direccionLugar = "test dirección";

    jest
      .spyOn(lugarModel, "findOneAndUpdate")
      .mockImplementationOnce((userId, user) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await updateLugar(lugarId, lugar);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Should FindAllLugarcreados Response ok", async () => {
    jest
      .spyOn(lugarModel, "find")
      .mockReturnValue(Promise.resolve([{ nombre: "flores" }]));

    const expected = await FindAllLugarcreados();
    console.log(expected);
    expect(expected.status).toBe(200);
  });

  it("Should FindAllLugarcreados response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    jest
      .spyOn(lugarModel, "find")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindAllLugarcreados();
    } catch (error) {
      expect(error.status).toEqual(400);
    }
  });

//   it("Should FindAllEventosLike Response ok", async () => {
//     jest
//       .spyOn(lugarModelLIke, "find")
//       .mockReturnValue(Promise.resolve([{ Idevento: "1111" }]));

//     const expected = await FindAllEventosLike();
//     console.log(expected);
//     expect(expected.status).toBe(200);
//   });

//   it("Should FindAllEventosLike response Fail", async () => {
//     const expectedErrorData = { errorMessage: "test error scenario" };
//     jest
//       .spyOn(lugarModelLIke, "find")
//       .mockImplementationOnce(() =>
//         Promise.reject(new Error(expectedErrorData))
//       );

//     try {
//       await FindAllEventosLike();
//     } catch (error) {
//       expect(error.status).toEqual(500);
//     }
//   });
});
