const routes = (handler) => [
  {
    method: "POST",
    path: "/friend/{userId}/add",
    handler: handler.postAddFriendHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "POST",
    path: "/friend/{userId}/accept",
    handler: handler.postAcceptFriendHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "POST",
    path: "/friend/{userId}/reject",
    handler: handler.postRejectFriendHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "POST",
    path: "/friend/{userId}/block",
    handler: handler.postBlockFriendHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/friend/{userId}",
    handler: handler.getFriendByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/users/friend",
    handler: handler.getUserFriendHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/users/friend/request",
    handler: handler.getUserFriendRequestHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/users/friend/block",
    handler: handler.getUserBlockedListHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/friend/{userId}",
    handler: handler.deleteFriendByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/friend/blocked/{userId}",
    handler: handler.deleteBlockedFriendByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
];

module.exports = routes;
