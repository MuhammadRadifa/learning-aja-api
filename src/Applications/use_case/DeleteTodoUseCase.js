class DeleteTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    this._validateUseCasePayload(useCasePayload);
    const { todoId, ownerId } = useCasePayload;
    await this._todoRepository.checkAvailabilityTodo(todoId);
    await this._todoRepository.verifyTodoOwner(todoId, ownerId);
    await this._todoRepository.deleteTodoById(todoId);
  }

  _validateUseCasePayload(payload) {
    const { todoId, ownerId } = payload;
    if (!todoId || !ownerId) {
      throw new Error("DELETE_TODO.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof todoId !== "string" || typeof ownerId !== "string") {
      throw new Error("DELETE_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DeleteTodoUseCase;
