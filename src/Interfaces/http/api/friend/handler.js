const AcceptFriendUseCase = require("../../../../Applications/use_case/AcceptFriendUseCase");
const AddFriendUseCase = require("../../../../Applications/use_case/AddFriendUseCase");
const BlockFriendUseCase = require("../../../../Applications/use_case/BlockFriendUseCase");
const DeleteFriendUseCase = require("../../../../Applications/use_case/DeleteFriendUseCase");
const GetFriendBlockedListUseCase = require("../../../../Applications/use_case/GetFriendBlockedListUseCase");
const GetFriendListRequestUseCase = require("../../../../Applications/use_case/GetFriendListRequestUseCase");
const GetFriendListUseCase = require("../../../../Applications/use_case/GetFriendListUseCase");
const RejectFriendUseCase = require("../../../../Applications/use_case/RejectFriendUseCase");
const UnBlockFriendUseCase = require("../../../../Applications/use_case/UnBlockFriendUseCase");

class FriendHandler {
  constructor(container) {
    this._container = container;

    this.postAddFriendHandler = this.postAddFriendHandler.bind(this);
    this.postAcceptFriendHandler = this.postAcceptFriendHandler.bind(this);
    this.postRejectFriendHandler = this.postRejectFriendHandler.bind(this);
    this.postBlockFriendHandler = this.postBlockFriendHandler.bind(this);
    this.getFriendByIdHandler = this.getFriendByIdHandler.bind(this);
    this.getUserFriendHandler = this.getUserFriendHandler.bind(this);
    this.getUserFriendRequestHandler =
      this.getUserFriendRequestHandler.bind(this);
    this.getUserBlockedListHandler = this.getUserBlockedListHandler.bind(this);
    this.deleteFriendByIdHandler = this.deleteFriendByIdHandler.bind(this);
    this.deleteBlockedFriendByIdHandler =
      this.deleteBlockedFriendByIdHandler.bind(this);
  }

  async postAddFriendHandler(request, h) {
    const addFriendUseCase = this._container.getInstance(AddFriendUseCase.name);
    const { id: credentialId } = request.auth.credentials;
    const friendId = request.params.userId;
    const useCasePayload = {
      userId: credentialId,
      friendId,
    };

    const addedFriend = await addFriendUseCase.execute(useCasePayload);
    const response = h.response({
      status: "success",
      message: "permintaan pertemanan berhasil dikirim",
      data: {
        addedFriend,
      },
    });
    response.code(201);
    return response;
  }

  async postAcceptFriendHandler(request, h) {
    const acceptFriendUseCase = this._container.getInstance(
      AcceptFriendUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const friendId = request.params.userId;

    const useCasePayload = {
      userId: credentialId,
      friendId,
    };

    await acceptFriendUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "permintaan pertemanan berhasil diterima",
    });
    response.code(201);
    return response;
  }

  async postRejectFriendHandler(request, h) {
    const rejectFriendUseCase = this._container.getInstance(
      RejectFriendUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const friendId = request.params.userId;

    const useCasePayload = {
      senderId: credentialId,
      receiverId: friendId,
    };

    await rejectFriendUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "permintaan pertemanan berhasil ditolak",
    });
    response.code(201);
    return response;
  }

  async postBlockFriendHandler(request, h) {
    const blockFriendUseCase = this._container.getInstance(
      BlockFriendUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const friendId = request.params.userId;

    const useCasePayload = {
      userId: credentialId,
      blockId: friendId,
    };

    await blockFriendUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "pengguna berhasil diblokir",
    });

    response.code(201);
    return response;
  }

  async getFriendByIdHandler(request, h) {
    const getFriendListUseCase = this._container.getInstance(
      GetFriendListUseCase.name
    );
    const { userId } = request.params;

    const useCasePayload = {
      userId,
    };

    const friendList = await getFriendListUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      data: {
        friendList,
      },
    });

    response.code(200);
    return response;
  }

  async getUserFriendHandler(request, h) {
    const getFriendListUseCase = this._container.getInstance(
      GetFriendListUseCase.name
    );
    const { id: userId } = request.auth.credentials;

    const useCasePayload = {
      userId,
    };

    const friendList = await getFriendListUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      data: {
        friendList,
      },
    });

    response.code(200);
    return response;
  }

  async getUserFriendRequestHandler(request, h) {
    const getFriendListRequestUseCase = this._container.getInstance(
      GetFriendListRequestUseCase.name
    );
    const { id: userId } = request.auth.credentials;

    const useCasePayload = {
      userId,
    };

    const friendListRequest = await getFriendListRequestUseCase.execute(
      useCasePayload
    );

    const response = h.response({
      status: "success",
      data: {
        friendListRequest,
      },
    });

    response.code(200);
    return response;
  }

  async getUserBlockedListHandler(request, h) {
    const getFriendBlockedListUseCase = this._container.getInstance(
      GetFriendBlockedListUseCase.name
    );

    const { id: userId } = request.auth.credentials;

    const useCasePayload = {
      userId,
    };

    const friendBlockedList = await getFriendBlockedListUseCase.execute(
      useCasePayload
    );

    const response = h.response({
      status: "success",
      data: {
        friendBlockedList,
      },
    });
    response.code(200);
    return response;
  }

  async deleteFriendByIdHandler(request, h) {
    const deleteFriendUseCase = this._container.getInstance(
      DeleteFriendUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const friendId = request.params.userId;

    const useCasePayload = {
      userId: credentialId,
      friendId,
    };

    await deleteFriendUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "pengguna berhasil dihapus dari daftar teman",
    });

    response.code(200);
    return response;
  }

  async deleteBlockedFriendByIdHandler(request, h) {
    const unBlockFriendUseCase = this._container.getInstance(
      UnBlockFriendUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const friendId = request.params.userId;

    const useCasePayload = {
      userId: credentialId,
      blockId: friendId,
    };

    await unBlockFriendUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "pengguna berhasil dihapus dari daftar teman yang diblokir",
    });

    response.code(200);
    return response;
  }
}

module.exports = FriendHandler;
