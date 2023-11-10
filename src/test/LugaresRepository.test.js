const mongoose = require("mongoose");
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
  FindAllLugarLike,
} = require("../repository/LugaresRepositoty");
const lugarlike = [
  {
    _id: "65418bcd067ba54ad063bc44",
    categoriaLugar: ["Parques"],
    usuario: "Stiven",
    nombreLugar: "Parque Explora",
    direccionLugar: "Carrera 52 # 73-75, Medellín, Antioquia.",
    horarioLugar:
      "Varía según la temporada, consulta el sitio web para más detalles.",
    descripcionLugar:
      "Parque Explora es un centro interactivo de ciencia y tecnología que combina diversión y aprendizaje. Ofrece a los visitantes la oportunidad de explorar conceptos científicos a través de exhibiciones interactivas, experimentos y demostraciones. El acuario del parque es uno de los más grandes de América Latina y alberga una impresionante colección de especies marinas. El planetario brinda experiencias educativas y fascinantes sobre el universo.",
    atraccionesLugar:
      "Exhibiciones Interactivas: El corazón de Parque Explora son sus numerosas exhibiciones interactivas que abarcan una amplia gama de temas científicos y tecnológicos. Los visitantes pueden tocar, experimentar y aprender mientras exploran conceptos de física, biología, matemáticas y más. Desde experimentos sobre la electricidad hasta la física de los fluidos, estas exhibiciones fomentan la curiosidad y la experimentación.\n\nAcuario: El parque alberga uno de los acuarios más grandes de América Latina. Este acuario submarino es una experiencia impresionante que permite a los visitantes explorar un mundo submarino vibrante. Puedes observar tiburones, tortugas, peces tropicales y otros animales marinos en su entorno natural. El acuario también destaca la importancia de la conservación marina y la biodiversidad de los océanos.\n\nPlanetario: El planetario de Parque Explora ofrece proyecciones impresionantes que te llevan a explorar el cosmos y los misterios del espacio. Las presentaciones en el planetario son educativas y cautivadoras, y te sumergen en la belleza y vastedad del universo. Es una experiencia que atrae tanto a niños como a adultos interesados en la astronomía y la exploración espacial.\n\nActividades Educativas: El parque ofrece una amplia variedad de actividades educativas que incluyen talleres, conferencias y demostraciones en vivo. Los programas educativos están diseñados para fomentar el pensamiento crítico y la curiosidad científica. Los visitantes pueden aprender sobre temas tan diversos como la energía, la biología, la robótica y la sostenibilidad.\n\nJardín Botánico Explora: El parque cuenta con un jardín botánico que exhibe una colección de plantas locales y exóticas. Los visitantes pueden explorar la diversidad de la flora y aprender sobre la importancia de la botánica y la conservación. El jardín botánico también es un espacio relajante para pasear y disfrutar de la naturaleza en medio de la ciudad.\n\nRestaurantes y Tiendas: Parque Explora ofrece opciones de restaurantes y tiendas de regalos para los visitantes que deseen comer o llevarse recuerdos de su visita.",
    contactoLugar: "Teléfono: +57 4 5168300, Sitio web: Parque Explora",
    fotosLugar:
      "data:image/jpeg;base64,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",
    __v: 0,
  },
];

describe("Test Lugar", () => {
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
});
