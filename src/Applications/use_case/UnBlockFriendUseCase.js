class UnBlockFriendUseCase {
  constructor({ friendRepository }) {
    this._friendRepository = friendRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { userId, blockId } = useCasePayload;
    await this._friendRepository.verifyUserUnblocking(userId, blockId);
    await this._friendRepository.checkBlockFriend(userId, blockId);
    await this._friendRepository.unBlockFriend(userId, blockId);
  }

  _validatePayload(payload) {
    const { userId, blockId } = payload;
    if (!userId || !blockId) {
      throw new Error("UNBLOCK_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof userId !== "string" || typeof blockId !== "string") {
      throw new Error(
        "UNBLOCK_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = UnBlockFriendUseCase;
