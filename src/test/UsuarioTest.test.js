const {FindOneUser} = require('../repository/UserRepository');
const {Response} = require("../utils/Response");

jest.mock('../repository/UserRepository.js');

const returnUsers = {
    "status": 200,
    "message": "Registros Encontrados",
    "result": [
      {
        "_id": "6540066e860aa53826cc38f0",
        "nombres": "Brayan Barajas",
        "email": "brayan@gmail.com",
        "usuario": "Stiven",
        "foto": "https://img.freepik.com/foto-gratis/empresario-masculino-feliz-trabajando-computadora-oficina_637285-6738.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais",
        "password": "123",
        "TipoUsuario": "administrador"
      },
      {
        "_id": "654006bc7aa7a8100d666957",
        "nombres": "camilo sanchez",
        "email": "camilo.sanchezb@unac.edu.co",
        "usuario": "kmiloblanco",
        "foto": "https://media-bog1-1.cdn.whatsapp.net/v/t61.24694-24/375874911_839381007507264_5933585992185526030_n.jpg?ccb=11-4&oh=01_AdTNLZLH-CTU-eYbpwx17LZd_9ks6PuW9GJMof7DB029Ng&oe=654D03DB&_nc_sid=000000&_nc_cat=103",
        "password": "123",
        "TipoUsuario": "administrador"
      },
    ]
}

const CreateUserMock = {
    "_id": "6540066e860aa53826cc38f0",
    "nombres": "Brayan Barajas",
    "email": "brayan@gmail.com",
    "usuario": "Stiven",
    "foto": "https://img.freepik.com/foto-gratis/empresario-masculino-feliz-trabajando-computadora-oficina_637285-6738.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais",
    "password": "123",
    "TipoUsuario": "administrador"
  };

describe("Test Users Repository", ()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    })



    it("should one only user", ()=>{
        const id = "651dc5e8016dc5b14c0bdda5";
        FindOneUser.mockReturnValueOnce(CreateUserMock);

        const response = FindOneUser(id);

        expect(response._id).toBe(CreateUserMock._id);
        expect(response).not.toBeNull();
    })

})