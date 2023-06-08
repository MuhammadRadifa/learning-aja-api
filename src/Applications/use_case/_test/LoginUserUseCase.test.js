const UserRepository = require("../../../Domains/user/UserRepository");
const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const AuthenticationTokenManager = require("../../security/AuthenticationTokenManager");
const PasswordHash = require("../../security/PasswordHash");
const LoginUserUseCase = require("../LoginUserUseCase");
const NewAuth = require("../../../Domains/authentications/entities/NewAuth");

describe("GetAuthenticationsUseCase", () => {
  it("should orchestrating the get authentication action correctly", async () => {
    // Arrange
    const useCasePayload = {
      email: "dicoding",
      password: "secret123",
    };
    const expectedAuthentication = new NewAuth({
      accessToken: "access_token",
      refreshToken: "refresh_token",
    });
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockPasswordHash.compare = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(expectedAuthentication.accessToken)
      );
    mockAuthenticationTokenManager.createRefreshToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(expectedAuthentication.refreshToken)
      );
    mockUserRepository.getIdByEmail = jest
      .fn()
      .mockImplementation(() => Promise.resolve("user-123"));
    mockAuthenticationRepository.addToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // Create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toStrictEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByEmail).toBeCalledWith("dicoding");
    expect(mockPasswordHash.compare).toBeCalledWith(
      "secret123",
      "encrypted_password"
    );
    expect(mockUserRepository.getIdByEmail).toBeCalledWith("dicoding");
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      email: "dicoding",
      id: "user-123",
    });
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      email: "dicoding",
      id: "user-123",
    });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(
      expectedAuthentication.refreshToken
    );
  });
});
