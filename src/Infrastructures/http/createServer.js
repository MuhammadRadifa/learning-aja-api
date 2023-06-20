const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const io = require("socket.io");

// Socket IO
const meetingSocket = require("../socket/meeting");

// Import domain
const ClientError = require("../../Commons/Exceptions/ClientError");
const DomainErrorTranslator = require("../../Commons/Exceptions/DomainErrorTranslator");

// Interfaces - HTTP
const users = require("../../Interfaces/http/api/users");
const authentications = require("../../Interfaces/http/api/authentications");
const todos = require("../../Interfaces/http/api/todos");
const schedules = require("../../Interfaces/http/api/schedule");
const chat = require("../../Interfaces/http/api/chat");
const meeting = require("../../Interfaces/http/api/meeting");

// let chatUsers = [];
const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const socketIO = io(server.listener, {
    cors: {
      origin: "*",
    },
  });

  socketIO.on("connection", (socket) => {
    meetingSocket(socket);
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy("learningaja_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: todos,
      options: { container },
    },
    {
      plugin: schedules,
      options: { container },
    },
    {
      plugin: chat,
      options: { container },
    },
    {
      plugin: meeting,
      options: { container },
    },
  ]);

  server.route({
    method: "GET",
    path: "/",
    handler: () => ({
      value: "Hello world!",
    }),
  });

  server.ext("onPreResponse", (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
        // message: translatedError.message,
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
