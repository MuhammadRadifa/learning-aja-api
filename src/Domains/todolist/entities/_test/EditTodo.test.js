const EditTodo = require("../EditTodo");

describe("a EditTodo entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      todoId: "abc",
      title: "abc",
      status: "abc",
    };

    // Action and Assert
    expect(() => new EditTodo(payload)).toThrowError(
      "EDIT_TODO.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      todoId: "abc",
      title: 123,
      content: {},
      status: "abc",
    };

    // Action and Assert
    expect(() => new EditTodo(payload)).toThrowError(
      "EDIT_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create EditTodo object correctly", () => {
    // Arrange
    const payload = {
      todoId: "abc",
      title: "abc",
      content: "abc",
      status: "abc",
    };

    // Action
    const { title, content, status, ownerId } = new EditTodo(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(content).toEqual(payload.content);
    expect(status).toEqual(payload.status);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
