const UserModel = require("../models/UsuariosModels");
const {
  FindOneUser,
  CreateUser,
  updateUser,
  FindOneUsername,
} = require("../repository/UserRepository");

describe("Test Usuarios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Shoul CreateUser  User response ok", async () => {
    const user = new UserModel();
    user.nombres = "test nombres";
    user.apellidos = "test apellidos";
    user.telefono = "test telefono";
    user.email = "test email";
    user.edad = "test edad";
    user.usuario = "userTest";

    jest
      .spyOn(user, "save")
      .mockImplementationOnce((user) => Promise.resolve(user));

    const result = await CreateUser(user);
    console.log(result);
    expect(result.status).toBe(201);
    expect(result.message).toBe("Se ha creado el Usuario Correctamente");
  });

  it("Shoul CreateUser  User response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const user = new UserModel();
    user.nombres = "test nombres";
    user.apellidos = "test apellidos";
    user.telefono = "test telefono";
    user.email = "test email";
    user.edad = "test edad";
    user.usuario = "userTest";

    jest
      .spyOn(user, "save")
      .mockImplementationOnce((user) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await CreateUser(user);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrio un error en el servidor");
    }
  });

  it("Shoul FindOneUser response ok", async () => {
    const userId = "123";
    const user = { _id: userId, name: "User1", usuario: "user1" };

    jest
      .spyOn(UserModel, "findOne")
      .mockImplementationOnce((userId) => Promise.resolve(user));

    const result = await FindOneUser(userId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registros Encontrados");
    expect(result.result).toEqual(user);
  });

  it("Shoul FindOneUser response Fail", async () => {
    const userId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(UserModel, "findOne")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindOneUser(userId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul FindOneUsername  User response ok", async () => {
    const userId = "123";
    const user = { _id: userId, email: "User1@gmail.com", usuario: "user1" };

    jest
      .spyOn(UserModel, "findOne")
      .mockImplementationOnce((userId) => Promise.resolve(user));

    const result = await FindOneUsername(userId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registros Encontrados");
    expect(result.result).toEqual(user);
  });

  it("Shoul FindOneUsername  User response Fail", async () => {
    const userId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(UserModel, "findOne")
      .mockImplementationOnce((userId) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindOneUsername(userId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Shoul updateUser response ok", async () => {
    const userId = "654afad180c86c12c0c29d14";

    const user = new UserModel();
    user.nombres = "test nombres";
    user.apellidos = "test apellidos";

    jest
      .spyOn(UserModel, "findOneAndUpdate")
      .mockImplementationOnce((userId, user) => Promise.resolve(user));

    const result = await updateUser(userId, user);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Actualizado correctamente");
  });

  it("Shoul updateUser response Fail", async () => {
    const userId = "654afad180c86c12c0c29d14";
    const expectedErrorData = { errorMessage: "test error scenario" };

    const user = new UserModel();
    user.nombres = "test nombres";
    user.apellidos = "test apellidos";

    jest
      .spyOn(UserModel, "findOneAndUpdate")
      .mockImplementationOnce((userId, user) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await updateUser(userId, user);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });
});
