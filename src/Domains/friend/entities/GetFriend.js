class GetFriend {
  constructor(payload) {
    this._verifyPayload(payload);
    const { userId } = payload;
    this.userId = userId;
  }

  _verifyPayload({ userId }) {
    if (!userId) {
      throw new Error("GET_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof userId !== "string") {
      throw new Error("GET_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = GetFriend;
