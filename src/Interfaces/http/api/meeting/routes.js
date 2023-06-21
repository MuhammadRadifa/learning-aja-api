const routes = (handler) => [
  {
    method: "POST",
    path: "/meetings",
    handler: handler.postMeetingHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/meetings/{meetingId}",
    handler: handler.getMeetingByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/users/meetings",
    handler: handler.getUsersMeetingHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/meetings/{meetingId}",
    handler: handler.deleteMeetingByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
];

module.exports = routes;
