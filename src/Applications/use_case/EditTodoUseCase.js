const EditTodo = require("../../Domains/todolist/entities/EditTodo");

class EditTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const { todoId, title, content, status } = new EditTodo(useCasePayload);
    await this._todoRepository.checkAvailabilityTodo(todoId);
    await this._todoRepository.verifyTodoOwner(todoId, useCasePayload.ownerId);
    await this._todoRepository.editTodoById({ todoId, title, content, status });
  }
}

module.exports = EditTodoUseCase;
