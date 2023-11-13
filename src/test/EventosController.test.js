const {
  FindAllEvento,
  FindOneEvento,
  FindAllEventoscreados,
  FindAllEventosLike,
  FindOneEventoname,
  deleteEvento,
  deleteEventoLike,
} = require("../repository/EventosRepository");
const { Response } = require("../utils/Response");
const { findAll, findById, findAllcreados, findAlllike, findOneEvento, deleteEventoData, deleteeventoDataLike } = require("../controllers/EventosContollers");
const { mockRequest, mockResponse } = require("./mocks/mocks");

jest.mock("../repository/EventosRepository.js");

describe("Test Evento Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should data to Controller Evento findAll", async () => {
    const sort = "sort";

    let req = mockRequest();
    const res = mockResponse();
    FindAllEvento.mockReturnValueOnce(sort);

    await findAll(req, res);
  });
  it("should data to Controller Evento findById", async () => {
    const sort = "sort";

    let req = mockRequest();
    const res = mockResponse();
    FindOneEvento.mockReturnValueOnce(sort);

    await findById(req, res);
  });
  it("should data to Controller Evento findAllcreados", async () => {
    const sort = "sort";

    let req = mockRequest();
    const res = mockResponse();
    FindAllEventoscreados.mockReturnValueOnce(sort);

    await findAllcreados(req, res);
  });
  it("should data to Controller Evento findAlllike", async () => {
    const sort = "sort";

    let req = mockRequest();
    const res = mockResponse();
    FindAllEventosLike.mockReturnValueOnce(sort);

    await findAlllike(req, res);
  });

  it("should data to Controller Evento findById deleteEvento", async () => {
    const EventoId = "someId";
    const deleteResponse = {
      status: 200,
      message: "Lugar eliminado con éxito",
      result: null,
    };

    let req = mockRequest({ params: { id: EventoId } });
    const res = mockResponse();

    deleteEvento.mockResolvedValueOnce(deleteResponse);

    await deleteEventoData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(deleteResponse);
  });
  it("should data to Controller Evento findById deleteEventoLike", async () => {
    const EventoId = "someId";
    const deleteResponse = {
      status: 200,
      message: "Evento eliminado con éxito",
      result: null,
    };

    let req = mockRequest({ params: { id: EventoId } });
    const res = mockResponse();

    deleteEventoLike.mockResolvedValueOnce(deleteResponse);

    await deleteeventoDataLike(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(deleteResponse);
  });


  
});
