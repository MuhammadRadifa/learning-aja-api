const TodoRepository = require("../TodoRepository");

describe("TodoRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const todoRepository = new TodoRepository();

    // Action and Assert
    await expect(
      todoRepository.addTodo({
        title: "abc",
        content: "abc",
        userId: "abc",
      })
    ).rejects.toThrowError("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(todoRepository.getTodoById("abc")).rejects.toThrowError(
      "TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      todoRepository.verifyTodoOwner("abc", "abc")
    ).rejects.toThrowError("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(todoRepository.deleteTodoById("abc")).rejects.toThrowError(
      "TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );

    await expect(todoRepository.getTodoDetail("abc")).rejects.toThrowError(
      "TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
