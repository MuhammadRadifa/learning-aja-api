const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const DeleteTodoUseCase = require("../DeleteTodoUseCase");

describe("DeleteTodoUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};
    const deletedTodoUseCase = new DeleteTodoUseCase({});

    await expect(
      deletedTodoUseCase.execute(useCasePayload)
    ).rejects.toThrowError("DELETE_TODO_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      id: 123,
      ownerId: {},
    };
    const deletedTodoUseCase = new DeleteTodoUseCase({});

    await expect(
      deletedTodoUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DELETE_TODO_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the delete todo action correctly", async () => {
    // Arrange
    const useCasePayload = {
      id: "todo-123",
      ownerId: "user-123",
    };

    /** creating dependency of use case */
    const mockTodoRepository = new TodoRepository();

    /** mocking needed function */
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
      useCasePayload.id,
      useCasePayload.ownerId
    );
    expect(mockTodoRepository.deleteTodoById).toBeCalledWith(useCasePayload.id);
  });
});
