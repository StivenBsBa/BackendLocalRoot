const { FindOneUsername } = require("../repository/UserRepository");
const { Response } = require("../utils/Response");
const {
  findOneUsuario,
  deleteUserData,
} = require("../controllers/UsuariosController");
const { mockRequest, mockResponse } = require("./mocks/mocks");

jest.mock("../repository/UserRepository.js");

const returnUsers = {
  status: 200,
  message: "Registros Encontrados",
  result: [
    {
      _id: "6540066e860aa53826cc38f0",
      nombres: "Brayan Barajas",
      email: "brayan@gmail.com",
      usuario: "Stiven",
      foto: "https://img.freepik.com/foto-gratis/empresario-masculino-feliz-trabajando-computadora-oficina_637285-6738.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais",
      password: "$2a$10$gHMECpzjNCaFd5IihsxKOuhTCljEZH/awNdLFXfMGEMtTUmZY6rAu",
      TipoUsuario: "administrador",
    },
  ],
};

describe("Test lugar Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should data to Controller Users", async () => {
    let req = mockRequest();
    const res = mockResponse();
    // Configura el mock directamente sobre el objeto importado
    FindOneUsername.mockResolvedValueOnce(returnUsers);

    await findOneUsuario(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should data to Controller User findById deleteEvento", async () => {
    const usuario = "usuario";
    const deleteResponse = {
      status: 200,
      message: "usuario eliminado con éxito",
      result: null,
    };

    let req = mockRequest({ params: { id: usuario } });
    const res = mockResponse();

    FindOneUsername.mockResolvedValueOnce(deleteResponse);

    await deleteUserData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(deleteResponse);
  });
});
