const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const TodoTableTestHelper = require("../../../../tests/TodoTableTestHelper");
const pool = require("../../database/postgres/pool");
const container = require("../../container");
const createServer = require("../createServer");

describe("/todos endpoint", () => {
  let server;
  let response;
  let authentication;
  let responesAuth;

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await TodoTableTestHelper.cleanTable();
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

    await server.inject({
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

  describe("when POST /todos", () => {
    it("should response 401 when not include access token", async () => {
      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {},
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 400 if payload not contain needed property", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {},
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat todo baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 if payload not meet data type specification", async () => {
      responesAuth = JSON.parse(authentication.payload);

      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {
          title: 123,
          content: 123,
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat todo baru karena tipe data tidak sesuai"
      );
    });

    it("should response 201 and persisted todo", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {
          title: "dicoding",
          content: "secret123456",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedTodo).toBeDefined();
    });
  });

  describe("when GET /todos/{todosId}", () => {
    it("should response 401 when not include access token", async () => {
      // Actions
      response = await server.inject({
        method: "GET",
        url: "/todos/123",
        payload: {},
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 404 if todo not found", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "GET",
        url: "/todos/123",
        payload: {},
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("todo tidak ditemukan");
    });

    it("should response 200 and todo", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {
          title: "dicoding",
          content: "dicoding",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      const { id } = responseJson.data.addedTodo;

      response = await server.inject({
        method: "GET",
        url: `/todos/${id}`,
        payload: {},
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson2 = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson2.status).toEqual("success");
      expect(responseJson2.data.todo).toBeDefined();
    });
  });

  describe("when DELETE /todos/{todosId}", () => {
    it("should response 401 when not include access token", async () => {
      // Actions
      response = await server.inject({
        method: "DELETE",
        url: "/todos/123",
        payload: {},
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 404 if todo not found", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "DELETE",
        url: "/todos/xxx",
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("todo tidak ditemukan");
    });

    it("should response 200 and delete todo", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {
          title: "dicoding",
          content: "dicoding",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      const { id } = responseJson.data.addedTodo;

      response = await server.inject({
        method: "DELETE",
        url: `/todos/${id}`,
        payload: {},
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson2 = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson2.status).toEqual("success");
      expect(responseJson2.message).toEqual("todo berhasil dihapus");
    });
  });

  describe("when PUT /todos/{todosId}", () => {
    it("should response 401 when not include access token", async () => {
      // Actions
      response = await server.inject({
        method: "PUT",
        url: "/todos/123",
        payload: {},
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 404 if todo not found", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "PUT",
        url: "/todos/xxx",
        payload: {
          title: "dicoding",
          content: "dicoding",
          status: "completed",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("todo tidak ditemukan");
    });

    it("should response 200 and update todo", async () => {
      responesAuth = JSON.parse(authentication.payload);
      // Actions
      response = await server.inject({
        method: "POST",
        url: "/todos",
        payload: {
          title: "dicoding",
          content: "dicoding",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      const { id } = responseJson.data.addedTodo;

      response = await server.inject({
        method: "PUT",
        url: `/todos/${id}`,
        payload: {
          title: "dicoding",
          content: "dicoding",
          status: "completed",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson2 = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson2.status).toEqual("success");
      expect(responseJson2.message).toEqual("todo berhasil diperbarui");
    });
  });

  describe("when GET /users/todos", () => {
    it("should response 401 when not include access token", async () => {
      // Actions
      response = await server.inject({
        method: "GET",
        url: "/users/todos",
        payload: {},
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 and return todos", async () => {
      responesAuth = JSON.parse(authentication.payload);

      // response = await server.inject({
      //   method: "POST",
      //   url: "/todos",
      //   payload: {
      //     title: "dicoding",
      //     content: "secret123456",
      //   },
      //   headers: {
      //     Authorization: `Bearer ${responesAuth.data.accessToken}`,
      //   },
      // });

      // Actions
      response = await server.inject({
        method: "GET",
        url: "/users/todos",
        payload: {},
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.todos).toBeDefined();
    });
  });
});
