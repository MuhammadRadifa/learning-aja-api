const { compareSync } = require("bcrypt");
const AddTodoUseCase = require("../../../../Applications/use_case/AddTodoUseCase");
const DeleteTodoUseCase = require("../../../../Applications/use_case/DeleteTodoUseCase");
const DetailTodoUseCase = require("../../../../Applications/use_case/DetailTodoUseCase");

class TodosHandler {
  constructor(container) {
    this._container = container;

    this.postTodoHandler = this.postTodoHandler.bind(this);
    this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
    this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);
  }

  async postTodoHandler(request, h) {
    const addTodoUseCase = this._container.getInstance(AddTodoUseCase.name);
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      ...request.payload,
      ownerId: credentialId,
    };
    const addedTodo = await addTodoUseCase.execute(useCasePayload);
    const response = h.response({
      status: "success",
      data: {
        addedTodo,
      },
    });
    response.code(201);
    return response;
  }

  async getTodoByIdHandler(request, h) {
    const detailTodoUseCase = this._container.getInstance(
      DetailTodoUseCase.name
    );
    const { id: credentialId } = request.auth.credentials;
    const useCasePayload = {
      todoId: request.params.todosId,
      ownerId: credentialId,
    };
    const todo = await detailTodoUseCase.execute(useCasePayload);
    return {
      status: "success",
      data: {
        todo,
      },
    };
  }

  async deleteTodoByIdHandler(request, h) {
    const deleteTodoUseCase = this._container.getInstance(
      DeleteTodoUseCase.name
    );
    const useCasePayload = {
      todoId: request.params.todosId,
      ownerId: request.auth.credentials.id,
    };
    await deleteTodoUseCase.execute(useCasePayload);
    return {
      status: "success",
      message: "todo berhasil dihapus",
    };
  }
}

module.exports = TodosHandler;
