const FriendHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "friend",
  register: async (server, { container }) => {
    const friendHandler = new FriendHandler(container);
    server.route(routes(friendHandler));
  },
};
