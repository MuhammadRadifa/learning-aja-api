class PostedFriend {
  constructor(payload) {
    this._verifyPayload(payload);
    const { friendId, username } = payload;
    this.friendId = friendId;
    this.username = username;
  }

  _verifyPayload({ friendId, username }) {
    if (!friendId || !username) {
      throw new Error("POSTED_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof friendId !== "string" || typeof username !== "string") {
      throw new Error("POSTED_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PostedFriend;
