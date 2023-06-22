const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const FriendTableTestHelper = require("../../../../tests/FriendTableTestHelper");
const pool = require("../../database/postgres/pool");
const container = require("../../container");
const createServer = require("../createServer");

describe("/friend endpoint", () => {
  let server;
  let response;
  let userPost;
  let userFriend;
  let authentication;
  let responesAuth;
  let authFriend;

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await FriendTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    const loginPayload = {
      email: "dicoding@mail.com",
      password: "secret123456",
    };

    const friendLoginPayload = {
      email: "dicoding2@mail.com",
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

    userFriend = await server.inject({
      method: "POST",
      url: "/users",
      payload: {
        username: "dicoding2",
        email: "dicoding2@mail.com",
        password: "secret123456",
        fullname: "Dicoding Indonesia 2",
      },
    });

    authentication = await server.inject({
      method: "POST",
      url: "/authentications",
      payload: loginPayload,
    });

    authFriend = await server.inject({
      method: "POST",
      url: "/authentications",
      payload: friendLoginPayload,
    });
  });

  describe("when POST /friend/{userId}/add", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "POST",
        url: "/friend/user-123/add",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when add friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userFriend = JSON.parse(userFriend.payload);
      const {
        addedUser: { id },
      } = userFriend.data;

      response = await server.inject({
        method: "POST",
        url: `/friend/${id}/add`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toEqual(
        "permintaan pertemanan berhasil dikirim"
      );
    });
  });

  describe("when POST /friend/{userId}/accept", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "POST",
        url: "/friend/user-123/accept",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when accept friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userFriend = JSON.parse(userFriend.payload);
      const {
        addedUser: { id },
      } = userFriend.data;

      await server.inject({
        method: "POST",
        url: `/friend/${id}/add`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      response = await server.inject({
        method: "POST",
        url: `/friend/${id}/accept`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toEqual(
        "permintaan pertemanan berhasil diterima"
      );
    });
  });

  describe("when POST /friend/{userId}/reject", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "POST",
        url: "/friend/user-123/reject",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when reject friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      authFriend = JSON.parse(authFriend.payload);
      const { accessToken: accessTokenFriend } = authFriend.data;

      userFriend = JSON.parse(userFriend.payload);
      const {
        addedUser: { id },
      } = userFriend.data;

      await server.inject({
        method: "POST",
        url: `/friend/${id}/add`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      response = await server.inject({
        method: "POST",
        url: `/friend/${id}/reject`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
    });
  });

  describe("when POST /friend/{userId}/block", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "POST",
        url: "/friend/user-123/block",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when block friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userFriend = JSON.parse(userFriend.payload);
      const {
        addedUser: { id },
      } = userFriend.data;

      response = await server.inject({
        method: "POST",
        url: `/friend/${id}/block`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toEqual("pengguna berhasil diblokir");
    });
  });

  describe("when GET /friend/{userId}", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "GET",
        url: "/friend/user-123",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when get friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      response = await server.inject({
        method: "GET",
        url: `/friend/user-123`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.friendList).toBeDefined();
    });
  });

  describe("when GET /users/friend", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "GET",
        url: "/users/friend",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when get friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      response = await server.inject({
        method: "GET",
        url: `/users/friend`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });
  });

  describe("when GET /users/friend/request", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "GET",
        url: "/users/friend/request",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when get friend request", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userPost = JSON.parse(userPost.payload);
      const {
        addedUser: { id: userId },
      } = userPost.data;

      authFriend = JSON.parse(authFriend.payload);
      const { accessToken: accessTokenFriend } = authFriend.data;

      await server.inject({
        method: "POST",
        url: `/friend/${userId}/add`,
        headers: {
          Authorization: `Bearer ${accessTokenFriend}`,
        },
      });

      response = await server.inject({
        method: "GET",
        url: `/users/friend/request`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.friendListRequest).toBeDefined();
    });
  });

  describe("when GET /users/friend/block", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "GET",
        url: "/users/friend/block",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when get friend block", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      response = await server.inject({
        method: "GET",
        url: `/users/friend/block`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.friendBlockedList).toBeDefined();
    });
  });

  describe("when DELETE /friend/{userId}", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "DELETE",
        url: "/friend/user-123",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when delete friend", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userFriend = JSON.parse(userFriend.payload);
      const {
        addedUser: { id },
      } = userFriend.data;

      await server.inject({
        method: "POST",
        url: `/friend/${id}/add`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await server.inject({
        method: "POST",
        url: `/friend/${id}/accept`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      response = await server.inject({
        method: "DELETE",
        url: `/friend/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toEqual(
        "pengguna berhasil dihapus dari daftar teman"
      );
    });
  });

  describe("when DELETE /friend/blocked/{userId}", () => {
    it("should response 401 when not include access token", async () => {
      response = await server.inject({
        method: "DELETE",
        url: "/friend/blocked/user-123",
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 200 when delete friend blocked", async () => {
      responesAuth = JSON.parse(authentication.payload);
      const { accessToken } = responesAuth.data;

      userFriend = JSON.parse(userFriend.payload);
      const {
        addedUser: { id },
      } = userFriend.data;

      await server.inject({
        method: "POST",
        url: `/friend/${id}/add`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await server.inject({
        method: "POST",
        url: `/friend/${id}/block`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      response = await server.inject({
        method: "DELETE",
        url: `/friend/blocked/${id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toEqual(
        "pengguna berhasil dihapus dari daftar teman yang diblokir"
      );
    });
  });
});
