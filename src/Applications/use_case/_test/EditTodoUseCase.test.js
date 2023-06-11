const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const EditTodoUseCase = require("../EditTodoUseCase");
const EditTodo = require("../../../Domains/todolist/entities/EditTodo");

describe("EditTodoUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};
    const editTodoUseCase = new EditTodoUseCase({});

    await expect(editTodoUseCase.execute(useCasePayload)).rejects.toThrowError(
      "EDIT_TODO.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      todoId: 123,
      title: 123,
      content: {},
      status: "abc",
      ownerId: "abc",
    };

    const editTodoUseCase = new EditTodoUseCase({});

    await expect(editTodoUseCase.execute(useCasePayload)).rejects.toThrowError(
      "EDIT_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the edit todo action correctly", async () => {
    const useCasePayload = {
      todoId: "todo-123",
      title: "abc",
      content: "abc",
      status: "abc",
    };

    const expectedEditTodo = new EditTodo({
      todoId: useCasePayload.todoId,
      title: useCasePayload.title,
      content: useCasePayload.content,
      status: useCasePayload.status,
    });

    const mockTodoRepository = new TodoRepository();

    mockTodoRepository.checkAvailabilityTodo = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockTodoRepository.verifyTodoOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockTodoRepository.editTodoById = jest.fn(() =>
      Promise.resolve(expectedEditTodo)
    );

    const editTodoUseCase = new EditTodoUseCase({
      todoRepository: mockTodoRepository,
    });

    await editTodoUseCase.execute(useCasePayload);

    expect(mockTodoRepository.checkAvailabilityTodo).toBeCalledWith(
      useCasePayload.todoId
    );
    expect(mockTodoRepository.verifyTodoOwner).toBeCalledWith(
      useCasePayload.todoId,
      useCasePayload.ownerId
    );
    expect(mockTodoRepository.editTodoById).toBeCalledWith(
      new EditTodo({
        todoId: useCasePayload.todoId,
        title: useCasePayload.title,
        content: useCasePayload.content,
        status: useCasePayload.status,
      })
    );
  });
});
