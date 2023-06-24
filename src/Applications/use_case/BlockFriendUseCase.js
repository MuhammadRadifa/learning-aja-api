class BlockFriendUseCase {
  constructor({ friendRepository }) {
    this._friendRepository = friendRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { userId, blockId } = useCasePayload;
    await this._friendRepository.verifyIsYourSelf(userId, blockId);
    await this._friendRepository.verifyBlockUser(userId, blockId);
    await this._friendRepository.blockFriend(userId, blockId);
  }

  _validatePayload(payload) {
    const { userId, blockId } = payload;
    if (!userId || !blockId) {
      throw new Error("BLOCK_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof userId !== "string" || typeof blockId !== "string") {
      throw new Error(
        "BLOCK_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = BlockFriendUseCase;
