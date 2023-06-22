const PostFriend = require("../PostFriend");

describe("a PostFriend entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      userId: "abc",
    };

    // Action and Assert
    expect(() => new PostFriend(payload)).toThrowError(
      "POST_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      userId: 123,
      friendId: {},
    };

    // Action and Assert
    expect(() => new PostFriend(payload)).toThrowError(
      "POST_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostFriend object correctly", () => {
    // Arrange
    const payload = {
      userId: "abc",
      friendId: "abc",
    };

    // Action
    const { userId, friendId } = new PostFriend(payload);

    // Assert
    expect(userId).toEqual(payload.userId);
    expect(friendId).toEqual(payload.friendId);
  });
});
