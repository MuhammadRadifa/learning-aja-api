const UserLogin = require("../../Domains/user/entities/UserLogin");
const NewAuthentications = require("../../Domains/authentications/entities/NewAuth");

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { email, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByEmail(
      email
    );

    await this._passwordHash.compare(password, encryptedPassword);

    const id = await this._userRepository.getIdByEmail(email);

    const accessToken =
      await this._authenticationTokenManager.createAccessToken({
        email,
        id,
      });
    const refreshToken =
      await this._authenticationTokenManager.createRefreshToken({
        email,
        id,
      });

    const newAuthentication = new NewAuthentications({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
