const PostTodo = require("../../Domains/todolist/entities/PostTodo");

class AddTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const postTodo = new PostTodo(useCasePayload);
    return this._todoRepository.addTodo({
      title: postTodo.title,
      content: postTodo.content,
      ownerId: postTodo.ownerId,
    });
  }
}

module.exports = AddTodoUseCase;
