const GetFriend = require("../GetFriend");

describe("GetFriend entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new GetFriend(payload)).toThrowError(
      "GET_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      userId: 123,
    };

    // Action and Assert
    expect(() => new GetFriend(payload)).toThrowError(
      "GET_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create GetFriend object correctly", () => {
    // Arrange
    const payload = {
      userId: "abc",
    };

    // Action
    const { userId } = new GetFriend(payload);

    // Assert
    expect(userId).toEqual(payload.userId);
  });
});
