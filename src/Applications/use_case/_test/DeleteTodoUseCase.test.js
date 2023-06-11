const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const DeleteTodoUseCase = require("../DeleteTodoUseCase");

describe("DeleteTodoUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};
    const deletedTodoUseCase = new DeleteTodoUseCase({});

    await expect(
      deletedTodoUseCase.execute(useCasePayload)
    ).rejects.toThrowError("DELETE_TODO.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      todoId: 123,
      ownerId: 123,
    };
    const deletedTodoUseCase = new DeleteTodoUseCase({});

    await expect(
      deletedTodoUseCase.execute(useCasePayload)
    ).rejects.toThrowError("DELETE_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should orchestrating the delete todo action correctly", async () => {
    // Arrange
    const useCasePayload = {
      todoId: "todo-123",
      ownerId: "user-123",
    };

    /** creating dependency of use case */
    const mockTodoRepository = new TodoRepository();

    /** mocking needed function */
    mockTodoRepository.checkAvailabilityTodo = jest.fn(() => Promise.resolve());
    mockTodoRepository.verifyTodoOwner = jest.fn(() => Promise.resolve());
    mockTodoRepository.deleteTodoById = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const deleteTodoUseCase = new DeleteTodoUseCase({
      todoRepository: mockTodoRepository,
    });

    // Action
    await deleteTodoUseCase.execute(useCasePayload);

    // Assert
    expect(mockTodoRepository.verifyTodoOwner).toBeCalledWith(
      useCasePayload.todoId,
      useCasePayload.ownerId
    );
    expect(mockTodoRepository.deleteTodoById).toBeCalledWith(
      useCasePayload.todoId
    );
  });
});
