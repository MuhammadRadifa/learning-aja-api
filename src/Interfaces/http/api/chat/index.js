const ChatHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "chat",
  register: async (server, { container, socketIO }) => {
    const chatHandler = new ChatHandler(container, socketIO);
    server.route(routes(chatHandler));
  },
};
