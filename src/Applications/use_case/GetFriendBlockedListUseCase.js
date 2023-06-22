class GetFriendBlockedListUseCase {
  constructor({ friendRepository }) {
    this._friendRepository = friendRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { userId } = useCasePayload;
    const blockList = await this._friendRepository.getBlockList(userId);
    return blockList;
  }

  _validatePayload(payload) {
    const { userId } = payload;
    if (!userId) {
      throw new Error("GET_FRIEND_BLOCKED_LIST.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof userId !== "string") {
      throw new Error(
        "GET_FRIEND_BLOCKED_LIST.NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = GetFriendBlockedListUseCase;
