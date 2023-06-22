class GetFriendListRequestUseCase {
  constructor({ friendRepository }) {
    this._friendRepository = friendRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { userId } = useCasePayload;
    return this._friendRepository.getFriendRequestList(userId);
  }

  _validatePayload(payload) {
    const { userId } = payload;
    if (!userId) {
      throw new Error(
        "GET_FRIEND_LIST_REQUEST_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
      );
    }

    if (typeof userId !== "string") {
      throw new Error(
        "GET_FRIEND_LIST_REQUEST_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = GetFriendListRequestUseCase;
