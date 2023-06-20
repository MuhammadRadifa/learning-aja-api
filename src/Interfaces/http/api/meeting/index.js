const MeetingHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "meeting",
  register: async (server, { container, socketIO }) => {
    const meetingHandler = new MeetingHandler(container, socketIO);
    server.route(routes(meetingHandler));
  },
};
