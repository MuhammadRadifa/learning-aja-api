const PostTodo = require("../PostTodo");
const DummyText = require("../../../../../utils/DummyText");

describe("a PostTodo entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new PostTodo(payload)).toThrowError(
      "POST_TODO.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      title: 123,
      content: {},
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostTodo(payload)).toThrowError(
      "POST_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when title contains more than 50 characters", () => {
    // Arrange
    const payload = {
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,",
      content: "abc",
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostTodo(payload)).toThrowError(
      "POST_TODO.TITLE_LIMIT_CHAR"
    );
  });

  it("should throw error when content contains more than 1000 characters", () => {
    // Arrange
    const payload = {
      title: "abc",
      content: DummyText("1001"),
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostTodo(payload)).toThrowError(
      "POST_TODO.CONTENT_LIMIT_CHAR"
    );
  });

  it("should create PostTodo object correctly", () => {
    // Arrange
    const payload = {
      title: "abc",
      content: "abc",
      ownerId: "abc",
    };

    // Action
    const { title, content, ownerId } = new PostTodo(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(content).toEqual(payload.content);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
