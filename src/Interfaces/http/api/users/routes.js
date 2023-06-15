const routes = (handler) => [
  {
    method: "POST",
    path: "/users",
    handler: handler.postUserHandler,
  },
  {
    method: "GET",
    path: "/users",
    handler: handler.getUsersHandler,
  },
  {
    method: "GET",
    path: "/users/me",
    handler: handler.getOwnUserProfileHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
];

module.exports = routes;
