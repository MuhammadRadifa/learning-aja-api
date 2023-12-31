const DetailTodo = require("../DetailTodo");

describe("a DetailTodo entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new DetailTodo(payload)).toThrowError(
      "DETAIL_TODO.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      todoId: 123,
    };

    // Action and Assert
    expect(() => new DetailTodo(payload)).toThrowError(
      "DETAIL_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DetailTodo object correctly", () => {
    // Arrange
    const payload = {
      todoId: "abc",
    };

    // Action
    const { todoId } = new DetailTodo(payload);

    // Assert
    expect(todoId).toEqual(payload.todoId);
  });
});
