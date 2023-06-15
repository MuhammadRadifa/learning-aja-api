const AddUserUseCase = require("../../../../Applications/use_case/AddUserUseCase");
const GetUserListUseCase = require("../../../../Applications/use_case/GetUserListUseCase");
const GetOwnUserProfileUseCase = require("../../../../Applications/use_case/GetOwnUserProfileUseCase");

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getOwnUserProfileHandler = this.getOwnUserProfileHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);
    const response = h.response({
      status: "success",
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }

  async getUsersHandler() {
    const getUserListUseCase = this._container.getInstance(
      GetUserListUseCase.name
    );
    const users = await getUserListUseCase.execute();
    return {
      status: "success",
      data: {
        users,
      },
    };
  }

  async getOwnUserProfileHandler(request) {
    const getOwnUserProfileUseCase = this._container.getInstance(
      GetOwnUserProfileUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const userProfile = await getOwnUserProfileUseCase.execute(credentialId);
    return {
      status: "success",
      data: {
        userProfile,
      },
    };
  }
}

module.exports = UsersHandler;
