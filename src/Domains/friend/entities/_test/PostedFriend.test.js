const PostedFriend = require("../PostedFriend");

describe("a PostedFriend entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      friendId: "abc",
    };

    // Action and Assert
    expect(() => new PostedFriend(payload)).toThrowError(
      "POSTED_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      friendId: {},
      username: 123,
    };

    // Action and Assert
    expect(() => new PostedFriend(payload)).toThrowError(
      "POSTED_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostedFriend object correctly", () => {
    // Arrange
    const payload = {
      friendId: "abc",
      username: "abc",
    };

    // Action
    const { friendId, username } = new PostedFriend(payload);

    // Assert
    expect(friendId).toEqual(payload.friendId);
    expect(username).toEqual(payload.username);
  });
});
