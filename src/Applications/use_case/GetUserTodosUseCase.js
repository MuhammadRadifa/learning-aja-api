class GetUserTodosUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const { userId } = useCasePayload;
    return this._todoRepository.getUserTodoList(userId);
  }
}

module.exports = GetUserTodosUseCase;
