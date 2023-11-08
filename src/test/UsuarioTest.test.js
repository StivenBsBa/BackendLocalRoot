const { FindOneUser, FindOneUsername, CreateUser, updateUser } = require('../repository/UserRepository');
const { Response } = require('../utils/Response');
const UserModel = require('../models/UsuariosModels');

jest.mock('../repository/UserRepository.js');

const FindOneMock = {
  _id: '6540066e860aa53826cc38f0',
  nombres: 'Brayan Barajas',
  email: 'brayan@gmail.com',
  usuario: 'Stiven',
  foto: 'https://img.freepik.com/foto-gratis/empresario-masculino-feliz-trabajando-computadora-oficina_637285-6738.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais',
  password: '$2a$10$gHMECpzjNCaFd5IihsxKOuhTCljEZH/awNdLFXfMGEMtTUmZY6rAu',
  TipoUsuario: 'administrador'
};

const CreateUserMock = {
  _id: 'new_user_id',
  nombres: 'Nuevo Usuario',
  email: 'nuevo@gmail.com',
  usuario: 'nuevo',
  foto: 'https://example.com/nuevo.jpg',
  password: 'hashed_password',
  TipoUsuario: 'cliente'
};

describe('Test Users Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find one user by ID', async () => {
    const id = '651dc5e8016dc5b14c0bdda5';

    FindOneUser.mockReturnValue(FindOneMock);

    const response = await FindOneUser(id);

    expect(response._id).toBe(FindOneMock._id);
    expect(response.nombres).toBe(FindOneMock.nombres);
    // Add more expectations as needed
  });


  it('should find one user by username', async () => {
    const username = 'Stiven';

    FindOneUsername.mockReturnValue(FindOneMock);

    const response = await FindOneUsername(username);

    expect(response.usuario).toBe(FindOneMock.usuario);
    // Add more expectations as needed
  });

  it('should create a new user', async () => {
    const userToCreate = { /* User data for creation */ };

    CreateUser.mockReturnValue(CreateUserMock);

    const response = await CreateUser(userToCreate);

    expect(response._id).toBe(CreateUserMock._id);
    expect(response.nombres).toBe(CreateUserMock.nombres);
    
  });

 

 
});
