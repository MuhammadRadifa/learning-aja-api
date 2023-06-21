const routes = (handler) => [
  {
    method: "GET",
    path: "/chats",
    handler: handler.startChatHandler,
  },
];

module.exports = routes;
