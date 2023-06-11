const DetailTodo = require("../../Domains/todolist/entities/DetailTodo");

class DetailTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const { todoId } = new DetailTodo(useCasePayload);
    await this._todoRepository.checkAvailabilityTodo(todoId);
    await this._todoRepository.verifyTodoOwner(todoId, useCasePayload.ownerId);
    const todo = await this._todoRepository.getTodoDetail(todoId);

    return todo;
  }
}

module.exports = DetailTodoUseCase;
