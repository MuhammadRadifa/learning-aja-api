const routes = (handler) => [
  {
    method: "POST",
    path: "/todos",
    handler: handler.postTodoHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/todos/{todosId}",
    handler: handler.getTodoByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/users/todos",
    handler: handler.getUserTodosHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "PUT",
    path: "/todos/{todosId}",
    handler: handler.putTodoByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/todos/{todosId}",
    handler: handler.deleteTodoByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
];

module.exports = routes;
