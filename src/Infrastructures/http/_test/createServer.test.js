const pool = require("../../database/postgres/pool");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const AuthenticationTokenManager = require("../../../Applications/security/AuthenticationTokenManager");

describe("HTTP server", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  it("should response 404 when request unregistered route", async () => {
    // Arrange
    const server = await createServer({});

    // Action
    const response = await server.inject({
      method: "GET",
      url: "/unregisteredRoute",
    });

    // Assert
    expect(response.statusCode).toEqual(404);
  });

  describe("when GET /", () => {
    it("should return 200 and hello world", async () => {
      // Arrange
      const server = await createServer({});
      // Action
      const response = await server.inject({
        method: "GET",
        url: "/",
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual("Hello world!");
    });
  });

  describe("when POST /users", () => {
    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        fullname: "Dicoding Indonesia",
        password: "secret123",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        username: "dicoding",
        password: "secret123",
        fullname: ["Dicoding Indonesia"],
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat user baru karena tipe data tidak sesuai"
      );
    });

    it("should response 400 when username more than 50 character", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
        password: "secret123",
        fullname: "Dicoding Indonesia",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat user baru karena karakter username melebihi batas limit"
      );
    });

    it("should response 400 when username contain restricted character", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        username: "dicoding indonesia",
        password: "secret123",
        fullname: "Dicoding Indonesia",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat user baru karena username mengandung karakter terlarang"
      );
    });

    it("should response 400 when username unavailable", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: "dicoding" });
      const requestPayload = {
        email: "dicoding@gmail.com",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
        password: "super_secret",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("username tidak tersedia");
    });

    it("should response 201 and persisted user", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        username: "dicoding",
        password: "secret123",
        fullname: "Dicoding Indonesia",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedUser).toBeDefined();
    });
  });

  describe("when GET /users", () => {
    it("should response 200 and return all users", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: "/users",
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      console.log(
        "🚀 ~ file: createServer.test.js:214 ~ it ~ responseJson:",
        responseJson
      );
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.users).toBeDefined();
    });
  });

  describe("when POST /authentications", () => {
    it("should response 400 if username not found", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        password: "secret123",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("email tidak ditemukan");
    });

    it("should response 401 if password wrong", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        username: "dicoding",
        password: "wrong_password",
      };
      const server = await createServer(container);
      // Add user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          email: "dicoding@gmail.com",
          username: "dicoding",
          password: "secret123",
          fullname: "Dicoding Indonesia",
        },
      });

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "kredensial yang Anda masukkan salah"
      );
    });

    it("should response 400 if login payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "harus mengirimkan email dan password"
      );
    });

    it("should response 400 if login payload wrong data type", async () => {
      // Arrange
      const requestPayload = {
        email: 123,
        password: "secret123",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("email dan password harus string");
    });

    it("should response 201 and new authentication", async () => {
      // Arrange
      const requestPayload = {
        email: "dicoding@gmail.com",
        password: "secret123",
      };
      const server = await createServer(container);
      // add user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          email: "dicoding@gmail.com",
          username: "dicoding",
          password: "secret123",
          fullname: "Dicoding Indonesia",
        },
      });

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });
  });

  describe("when PUT /authentications", () => {
    it("should return 200 and new access token", async () => {
      // Arrange
      const server = await createServer(container);
      // add user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          email: "dicoding@gmail.com",
          username: "dicoding",
          password: "secret123",
          fullname: "Dicoding Indonesia",
        },
      });
      // login user
      const loginResponse = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: {
          email: "dicoding@gmail.com",
          password: "secret123",
        },
      });
      const {
        data: { refreshToken },
      } = JSON.parse(loginResponse.payload);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
    });

    it("should return 400 payload not contain refresh token", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("harus mengirimkan token refresh");
    });

    it("should return 400 if refresh token not string", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken: 123,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("refresh token harus string");
    });

    it("should return 400 if refresh token not valid", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken: "invalid_refresh_token",
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("refresh token tidak valid");
    });

    it("should return 400 if refresh token not registered in database", async () => {
      // Arrange
      const server = await createServer(container);
      const refreshToken = await container
        .getInstance(AuthenticationTokenManager.name)
        .createRefreshToken({ username: "dicoding" });

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "refresh token tidak ditemukan di database"
      );
    });
  });

  describe("when DELETE /authentications", () => {
    it("should response 200 if refresh token valid", async () => {
      // Arrange
      const server = await createServer(container);
      const refreshToken = "refresh_token";
      await AuthenticationsTableTestHelper.addToken(refreshToken);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });

    it("should response 400 if refresh token not registered in database", async () => {
      // Arrange
      const server = await createServer(container);
      const refreshToken = "refresh_token";

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "refresh token tidak ditemukan di database"
      );
    });

    it("should response 400 if payload not contain refresh token", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("harus mengirimkan token refresh");
    });

    it("should response 400 if refresh token not string", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken: 123,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("refresh token harus string");
    });
  });

  it("should handle server error correctly", async () => {
    // Arrange
    const requestPayload = {
      email: "dicoding@gmail.com",
      username: "dicoding",
      fullname: "Dicoding Indonesia",
      password: "super_secret",
    };
    const server = await createServer({}); // fake injection

    // Action
    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual("error");
    expect(responseJson.message).toEqual("terjadi kegagalan pada server kami");
  });
});
