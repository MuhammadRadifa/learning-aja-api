class AcceptFriendUseCase {
  constructor({ friendRepository, userRepository }) {
    this._friendRepository = friendRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { userId, friendId } = useCasePayload;
    await this._userRepository.verifyAvailableUser(friendId);
    await this._friendRepository.verifyAvailableFriend(userId, friendId);
    await this._friendRepository.verifyAvailableFriendRequest(userId, friendId);
    await this._friendRepository.acceptFriend(userId, friendId);
    return this._friendRepository.removeFriendRequest(userId, friendId);
  }

  _validatePayload(payload) {
    const { userId, friendId } = payload;
    if (!userId || !friendId) {
      throw new Error("ACCEPT_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof userId !== "string" || typeof friendId !== "string") {
      throw new Error(
        "ACCEPT_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = AcceptFriendUseCase;
