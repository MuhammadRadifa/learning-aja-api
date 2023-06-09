const routes = (handler) => [
  {
    method: "POST",
    path: "/todos",
    handler: handler.postTodoHandler,
    options: {
      auth: "ambaajar_jwt",
    },
  },
  {
    method: "GET",
    path: "/todos/{todosId}",
    handler: handler.getTodoByIdHandler,
    options: {
      auth: "ambaajar_jwt",
    },
  },
  // edit todo later
  //   {
  //     method: "PUT",
  //     path: "/todos/{id}",
  //     handler: handler.putTodoByIdHandler,
  //     options: {
  //       auth: "ambaajar_jwt",
  //     },
  //   },
  {
    method: "DELETE",
    path: "/todos/{todosId}",
    handler: handler.deleteTodoByIdHandler,
    options: {
      auth: "ambaajar_jwt",
    },
  },
];

module.exports = routes;
