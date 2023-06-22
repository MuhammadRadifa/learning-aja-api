class DeleteFriendUseCase {
  constructor({ friendRepository, userRepository }) {
    this._friendRepository = friendRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { userId, friendId } = useCasePayload;
    await this._userRepository.verifyAvailableUser(userId);
    await this._userRepository.verifyAvailableUser(friendId);
    await this._friendRepository.checkFriendship(userId, friendId);
    await this._friendRepository.deleteFriend(userId, friendId);
  }

  _validatePayload(payload) {
    const { userId, friendId } = payload;
    if (!userId || !friendId) {
      throw new Error("DELETE_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof userId !== "string" || typeof friendId !== "string") {
      throw new Error(
        "DELETE_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = DeleteFriendUseCase;
