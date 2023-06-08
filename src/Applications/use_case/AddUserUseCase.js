const RegisterUser = require("../../Domains/user/entities/RegisterUser");

class AddUserUseCase {
  constructor({ userRepository, passwordHash, inputValidator }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._inputValidator = inputValidator;
  }

  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);
    await this._inputValidator.ValidateUsername(registerUser.username);
    await this._inputValidator.ValidateEmail(registerUser.email);
    await this._inputValidator.ValidatePassword(registerUser.password);
    await this._userRepository.verifyAvailableUsername(registerUser.username);
    await this._userRepository.verifyAvailableEmail(registerUser.email);
    registerUser.password = await this._passwordHash.hash(
      registerUser.password
    );
    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
