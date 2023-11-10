const { } = require("../repository/EventosRepository");
const { Response } = require("../utils/Response");
const { create } = require("../controllers/EventosContollers");
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
        password: "$2a$10$gHMECpzjNCaFd5IjhsxKOuhTCljEZH/awNdLFXfMGEMtTUmZY6rAu",
        __v: 0,
        TipoUsuario: "administrador"
    },
    {
        _id: "654006bc7aa7a8100d666957",
        nombres: "camilo sanchez",
        email: "camilo.sanchezb@unac.edu.co",
        usuario: "kmiloblanco",
        foto: "https://media-bog1-1.cdn.whatsapp.net/v/t61.24694-24/375874911_839381007507264_5933585992185526030_n.jpg?ccb=11-4&oh=01_AdTNLZLH-CTU-eYbpwx17LZd_9ks6PuW9GJMof7DB029Ng&oe=654D03DB&_nc_sid=000000&_nc_cat=103",
        password: "$2a$10$yysQ7dY8RFjxXg5WUar0fe5JRgq7/CIpy8clxb3AifgZOaDt4lWpy",
        __v: 0,
        TipoUsuario: "administrador"
    },
    {
        _id: "65425079bb4d46845da5eb26",
        TipoUsuario: "Cliente",
        nombres: "Cliente",
        email: "cliente@gmail.com",
        usuario: "cliente",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXGU4N5l-tw45odrsx1XK0xwIsJDOANoZerw&usqp=CAU",
        password: "$2a$10$tExrA2SWz0zRo7OP4SVMxOBCnJ7ZcMLnHoxYb5zMQGY8em9gDLVNi",
        __v: 0
    }
]


};

const requestUser = {
  body: {
    
    nombres: "Brayan Barajas",
    email: "brayan@gmail.com",
    usuario: "Stiven",
    foto: "https://img.freepik.com/foto-gratis/empresario-masculino-feliz-trabajando-computadora-oficina_637285-6738.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais",
    password: "$2a$10$gHMECpzjNCaFd5IihsxKOuhTCljEZH/awNdLFXfMGEMtTUmZY6rAu",
    TipoUsuario: "administrador"
  }
};
describe("Test Users Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should data to Controller Create Fail Users", async () => {
    let req = mockRequest();
    req.params.password = "123";
    req.params.nombres = "Brayan Barajas";
    req.params.email = "brayan@gmail.com";
    req.params.usuario = "Stiven";
    req.params.usuario = "administrador";
    

    const res = mockResponse();
    Response.message = returnUsers.message;
    Response.status = returnUsers.status;
    Response.result = returnUsers.result;

    CreateUser.mockReturnValueOnce(returnUsers);

    const data = await create(req, res);
    console.log(data);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  
});

