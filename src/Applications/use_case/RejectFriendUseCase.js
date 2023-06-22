class RejectFriendUseCase {
  constructor({ friendRepository }) {
    this._friendRepository = friendRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { senderId, receiverId } = useCasePayload;
    await this._friendRepository.rejectFriend(senderId, receiverId);
  }

  _validatePayload(payload) {
    const { senderId, receiverId } = payload;
    if (!senderId || !receiverId) {
      throw new Error("REJECT_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof senderId !== "string" || typeof receiverId !== "string") {
      throw new Error(
        "REJECT_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = RejectFriendUseCase;
