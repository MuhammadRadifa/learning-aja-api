const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ScheduleTableTestHelper = require("../../../../tests/ScheduleTableTestHelper");
const pool = require("../../database/postgres/pool");
const container = require("../../container");
const createServer = require("../createServer");

describe("/schedule endpoint", () => {
  let server;
  let response;
  let authentication;
  let responesAuth;

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ScheduleTableTestHelper.cleanTable();
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

  describe("when POST /schedule", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 400 when request payload not contain needed property", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {},
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat jadwal baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: 123,
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
      );
    });

    it("should response 400 when title character length above 50 character", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title:
            "Dicoding IndonesiaDicodi" +
            "ng IndonesiaDicoding IndonesiaDicoding IndonesiaDicoding IndonesiaDicoding Indonesia",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat jadwal baru karena karakter title melebihi batas limit"
      );
    });

    it("should response 400 when lecturer character length above 50 character", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Dicoding Indonesia",
          lecturer:
            "Dicoding IndonesiaDicodi" +
            "ng IndonesiaDicoding IndonesiaDicoding IndonesiaDicoding IndonesiaDicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat jadwal baru karena karakter lecturer melebihi batas limit"
      );
    });

    it("should response 400 when room character length above 50 character", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Dicoding Indonesia",
          lecturer: "Dicoding Indonesia",
          room:
            "Dicoding IndonesiaDicodi" +
            "ng IndonesiaDicoding IndonesiaDicoding IndonesiaDicoding IndonesiaDicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat jadwal baru karena karakter room melebihi batas limit"
      );
    });

    it("should response 201 and persisted schedule", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedSchedule).toBeDefined();
    });
  });

  describe("when GET /users/schedule", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "GET",
        url: "/users/schedule",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 and return schedule", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      response = await server.inject({
        method: "GET",
        url: "/users/schedule",
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.schedule).toBeDefined();
    });
  });

  describe("when GET /schedule/{scheduleId}", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "GET",
        url: "/schedule/1",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 404 when schedule not found", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "GET",
        url: "/schedule/1",
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("jadwal tidak ditemukan");
    });

    it("should response 200 and return schedule", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      const { id } = responseJson.data.addedSchedule;

      response = await server.inject({
        method: "GET",
        url: `/schedule/${id}`,
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson2 = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson2.status).toEqual("success");
      expect(responseJson2.data.schedule).toBeDefined();
    });
  });

  describe("when PUT /schedule/{scheduleId}", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "PUT",
        url: "/schedule/1",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 404 when schedule not found", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "PUT",
        url: "/schedule/1",
        payload: {
          title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("jadwal tidak ditemukan");
    });

    it("should response 200 and return schedule", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      const { id } = responseJson.data.addedSchedule;

      response = await server.inject({
        method: "PUT",
        url: `/schedule/${id}`,
        payload: {
          title: "Update Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Update Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson2 = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson2.status).toEqual("success");
      expect(responseJson2.message).toEqual("jadwal berhasil diperbarui");
    });
  });

  describe("when DELETE /schedule/{scheduleId}", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "DELETE",
        url: "/schedule/1",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 404 when schedule not found", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "DELETE",
        url: "/schedule/1",
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("jadwal tidak ditemukan");
    });

    it("should response 200 and return schedule", async () => {
      responesAuth = JSON.parse(authentication.payload);

      response = await server.inject({
        method: "POST",
        url: "/schedule",
        payload: {
          title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
          lecturer: "Dicoding Indonesia",
          room: "Dicoding Indonesia",
          classTime: "Dicoding Indonesia",
          schedule: "Dicoding Indonesia",
        },
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      const { id } = responseJson.data.addedSchedule;

      response = await server.inject({
        method: "DELETE",
        url: `/schedule/${id}`,
        headers: {
          Authorization: `Bearer ${responesAuth.data.accessToken}`,
        },
      });

      const responseJson2 = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson2.status).toEqual("success");
      expect(responseJson2.message).toEqual("jadwal berhasil dihapus");
    });
  });
});
