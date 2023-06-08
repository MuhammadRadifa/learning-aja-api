const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const DetailTodo = require("../../../Domains/todolist/entities/DetailTodo");
const DetailTodoUseCase = require("../DetailTodoUseCase");

describe("DetailTodoUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};
    const detailTodoUseCase = new DetailTodoUseCase({});

    await expect(
      detailTodoUseCase.execute(useCasePayload)
    ).rejects.toThrowError("DETAIL_TODO_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      id: 123,
    };

    const detailTodoUseCase = new DetailTodoUseCase({});

    await expect(
      detailTodoUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DETAIL_TODO_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the detail todo action correctly", async () => {
    const useCasePayload = {
      id: "todo-123",
    };

    const mockTodoRepository = new TodoRepository();

    mockTodoRepository.getTodoDetail = jest.fn(() => Promise.resolve());

    const detailTodoUseCase = new DetailTodoUseCase({
      todoRepository: mockTodoRepository,
    });

    await detailTodoUseCase.execute(useCasePayload);

    expect(mockTodoRepository.getTodoDetail).toBeCalledWith(useCasePayload.id);
  });
});
