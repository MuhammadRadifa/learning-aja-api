const PostedTodo = require("../PostedTodo");

describe("a PostedTodo entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new PostedTodo(payload)).toThrowError(
      "POSTED_TODO.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: 123,
      content: {},
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostedTodo(payload)).toThrowError(
      "POSTED_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostedTodo object correctly", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: "abc",
      content: "abc",
      ownerId: "abc",
    };

    // Action
    const { title, content, ownerId } = new PostedTodo(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(content).toEqual(payload.content);
    expect(ownerId).toEqual(payload.ownerId);
  });

  it("should create PostedTodo object correctly", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: "abc",
      content: "abc",
      ownerId: "abc",
    };

    // Action
    const { id, title, content, ownerId } = new PostedTodo(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(content).toEqual(payload.content);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
