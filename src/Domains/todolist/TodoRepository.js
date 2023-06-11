class TodoRepository {
  async addTodo() {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getTodoById(id) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyTodoOwner(id, ownerId) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteTodoById(id) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getTodoDetail(id) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async editTodoById({ id, title, content, status }) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkAvailabilityTodo(id) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserTodoList(userId) {
    throw new Error("TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = TodoRepository;
