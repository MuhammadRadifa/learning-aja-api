class PostFriend {
  constructor(payload) {
    this._verifyPayload(payload);
    const { userId, friendId } = payload;
    this.userId = userId;
    this.friendId = friendId;
  }

  _verifyPayload({ userId, friendId }) {
    if (!userId || !friendId) {
      throw new Error("POST_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof userId !== "string" || typeof friendId !== "string") {
      throw new Error("POST_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PostFriend;
