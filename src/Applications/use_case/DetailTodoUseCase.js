const DetailTodo = require("../../Domains/todolist/entities/DetailTodo");

class DetailTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    this._validateUseCasePayload(useCasePayload);
    const { id } = new DetailTodo(useCasePayload);
    const todo = await this._todoRepository.getTodoDetail(id);

    return todo;
  }

  _validateUseCasePayload(payload) {
    const { id } = payload;
    if (!id) {
      throw new Error("DETAIL_TODO_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof id !== "string") {
      throw new Error("DETAIL_TODO_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailTodoUseCase;
