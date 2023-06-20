const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const MeetingTableTestHelper = require("../../../../tests/MeetingTableTestHelper");
const pool = require("../../database/postgres/pool");
const container = require("../../container");
const createServer = require("../createServer");

describe("/meetings endpoint", () => {
  let server;
  let response;
  let userPost;
  let authentication;
  let responesAuth;

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await MeetingTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    const loginPayload = {
      email: "dicoding@mail.com",
      password: "secret123456",
    };

    server = await createServer(container);

    userPost = await server.inject({
      method: "POST",
      url: "/users",
      payload: {
        username: "dicoding",
        email: "dicoding@mail.com",
        password: "secret123456",
        fullname: "Dicoding Indonesia",
      },
    });

    authentication = await server.inject({
      method: "POST",
      url: "/authentications",
      payload: loginPayload,
    });
  });

  describe("when POST /meetings", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "POST",
        url: "/meetings",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 400 if payload not contain needed property", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      response = await server.inject({
        method: "POST",
        url: "/meetings",
        payload: {},
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat meeting baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 if payload not meet data type specification", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      response = await server.inject({
        method: "POST",
        url: "/meetings",
        payload: {
          title: {},
          description: "Meeting",
          date: "2021-08-08",
          time: "08:00",
          location: "Jakarta",
          ownerId: "user-123",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat meeting baru karena tipe data tidak sesuai"
      );
    });

    it("should response 201 when meeting created", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userPost = JSON.parse(userPost.payload);
      const {
        addedUser: { id },
      } = userPost.data;

      response = await server.inject({
        method: "POST",
        url: "/meetings",
        payload: {
          title: "Meeting",
          description: "Meeting",
          date: "2021-08-08",
          time: "08:00",
          location: "Jakarta",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data).toBeDefined();
    });
  });
});
