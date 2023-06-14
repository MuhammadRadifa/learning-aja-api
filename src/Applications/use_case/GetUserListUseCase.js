const GetUser = require("../../Domains/user/entities/GetUser");

class GetUserListUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const userList = await this._userRepository.getUserList(useCasePayload);
    return userList.map((user) => new GetUser(user));
  }
}

module.exports = GetUserListUseCase;
