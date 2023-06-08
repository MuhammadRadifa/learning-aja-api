class DeleteTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    this._validateUseCasePayload(useCasePayload);
    const { id, ownerId } = useCasePayload;
    await this._todoRepository.verifyTodoOwner(id, ownerId);
    await this._todoRepository.deleteTodoById(id);
  }

  _validateUseCasePayload(payload) {
    const { id, ownerId } = payload;
    if (!id || !ownerId) {
      throw new Error("DELETE_TODO_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof id !== "string" || typeof ownerId !== "string") {
      throw new Error("DELETE_TODO_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DeleteTodoUseCase;
