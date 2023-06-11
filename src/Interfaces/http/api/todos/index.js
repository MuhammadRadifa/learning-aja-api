const TodosHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "todos",
  register: async (server, { container }) => {
    const todosHandler = new TodosHandler(container);
    server.route(routes(todosHandler));
  },
};
