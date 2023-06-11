const PostedTodo = require("../../../Domains/todolist/entities/PostedTodo");
const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const GetUserTodosUseCase = require("../GetUserTodosUseCase");

describe("GetUserTodosUseCase", () => {
  it("should orchestrating the get user todos action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
    };

    const expectedPostedTodo = [
      new PostedTodo({
        id: "todo-123",
        title: "abc",
        content: "abc",
        status: "open",
        createdAt: "2021-08-08T07:22:33.555Z",
        ownerId: "user-123",
      }),
    ];

    /** creating dependency of use case */
    const mockTodoRepository = new TodoRepository();

    /** mocking needed function */
    mockTodoRepository.getUserTodoList = jest.fn(() =>
      Promise.resolve(expectedPostedTodo)
    );

    /** creating use case instance */
    const getTodoUseCase = new GetUserTodosUseCase({
      todoRepository: mockTodoRepository,
    });

    // Action
    const postedTodo = await getTodoUseCase.execute(useCasePayload);

    // Assert
    expect(postedTodo).toStrictEqual(expectedPostedTodo);
    expect(mockTodoRepository.getUserTodoList).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
