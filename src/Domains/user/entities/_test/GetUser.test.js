const GetUser = require("../GetUser");

describe("a GetUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      username: "abc",
    };

    // Action and Assert
    expect(() => new GetUser(payload)).toThrowError(
      "GET_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      username: 123,
      fullname: true,
    };
    // Action and Assert
    expect(() => new GetUser(payload)).toThrowError(
      "GET_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create registerUser object correctly", () => {
    // Arrange
    const payload = {
      id: "user-123",
      username: "dicoding",
      fullname: "Dicoding Indonesia",
    };
    // Action
    const { username } = new GetUser(payload);
    // Assert
    expect(username).toEqual(payload.username);
  });
});
