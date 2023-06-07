const RegisterUser = require("../../../Domains/user/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/user/entities/RegisteredUser");
const UserRepository = require("../../../Domains/user/UserRepository");
const PasswordHash = require("../../security/PasswordHash");
const InputValidator = require("../../security/InputValidator");
const AddUserUseCase = require("../AddUserUseCase");

describe("AddUserUseCase", () => {
  it("should orchestrating the add user action correctly", async () => {
    // Arrange
    const useCasePayload = {
      username: "dicoding",
      password: "secret",
      fullname: "Dicoding Indonesia",
      email: "dicoding@gmail.com",
    };
    const expectedRegisteredUser = new RegisteredUser({
      id: "user-123",
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
      email: useCasePayload.email,
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();
    const mockInputValidator = new InputValidator();

    /** mocking needed function */
    mockUserRepository.verifyAvailableUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.verifyAvailableEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockInputValidator.ValidateUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockInputValidator.ValidateEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockInputValidator.ValidatePassword = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockUserRepository.addUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedRegisteredUser));

    /** creating use case instance */
    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
      inputValidator: mockInputValidator,
    });

    // Action
    const registeredUser = await getUserUseCase.execute(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(
      useCasePayload.username
    );
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(
      new RegisterUser({
        username: useCasePayload.username,
        password: "encrypted_password",
        fullname: useCasePayload.fullname,
        email: useCasePayload.email,
      })
    );
  });
});
