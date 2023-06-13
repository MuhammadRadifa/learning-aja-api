const routes = (handler) => [
  {
    method: "POST",
    path: "/schedule",
    handler: handler.postScheduleHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/schedule/{scheduleId}",
    handler: handler.getScheduleByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "GET",
    path: "/users/schedule",
    handler: handler.getUserScheduleHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "PUT",
    path: "/schedule/{scheduleId}",
    handler: handler.putScheduleByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/schedule/{scheduleId}",
    handler: handler.deleteScheduleByIdHandler,
    options: {
      auth: "learningaja_jwt",
    },
  },
];

module.exports = routes;
