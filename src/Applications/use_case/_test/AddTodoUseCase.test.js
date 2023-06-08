const PostTodo = require("../../../Domains/todolist/entities/PostTodo");
const PostedTodo = require("../../../Domains/todolist/entities/PostedTodo");
const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const AddTodoUseCase = require("../AddTodoUseCase");
const DummyText = require("../../../../utils/DummyText");

describe("AddTodoUseCase", () => {
  it("should orchestrating the add todo action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "abc",
      content: "abc",
      ownerId: "user-123",
    };

    const expectedPostedTodo = new PostedTodo({
      id: "todo-123",
      title: useCasePayload.title,
      content: useCasePayload.content,
      ownerId: useCasePayload.ownerId,
    });

    /** creating dependency of use case */
    const mockTodoRepository = new TodoRepository();

    /** mocking needed function */
    mockTodoRepository.addTodo = jest.fn(() =>
      Promise.resolve(expectedPostedTodo)
    );

    /** creating use case instance */
    const getTodoUseCase = new AddTodoUseCase({
      todoRepository: mockTodoRepository,
    });

    // Action
    const postedTodo = await getTodoUseCase.execute(useCasePayload);

    // Assert
    expect(postedTodo).toStrictEqual(expectedPostedTodo);
    expect(mockTodoRepository.addTodo).toBeCalledWith(
      new PostTodo(useCasePayload)
    );
  });
});
