const ScheduleHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "schedule",
  register: async (server, { container }) => {
    const scheduleHandler = new ScheduleHandler(container);
    server.route(routes(scheduleHandler));
  },
};
