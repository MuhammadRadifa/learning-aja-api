const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthenticationError = require("../../../Commons/Exceptions/AuthenticationError");
const InvariantError = require("../../../Commons/Exceptions/InvariantError");
const RegisterUser = require("../../../Domains/user/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/user/entities/RegisteredUser");
const pool = require("../../database/postgres/pool");
const UserRepositoryPostgres = require("../UserRepositoryPostgres");

describe("UserRepositoryPostgres", () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("verifyAvailableUsername function", () => {
    it("should throw InvariantError when username not available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: "dicoding" }); // memasukan user baru dengan username dicoding
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUsername("dicoding")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when username available", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUsername("dicoding")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("addUser function", () => {
    it("should persist register user and return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "dicoding",
        password: "secret_password",
        fullname: "Dicoding Indonesia",
        email: "dicoding@gmail.com",
      });
      const fakeIdGenerator = () => "123"; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById("user-123");
      expect(users).toHaveLength(1);
    });

    it("should return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "dicoding",
        password: "secret_password",
        fullname: "Dicoding Indonesia",
        email: "dicoding@gmail.com",
      });
      const fakeIdGenerator = () => "123"; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert
      expect(registeredUser).toStrictEqual(
        new RegisteredUser({
          id: "user-123",
          username: "dicoding",
          fullname: "Dicoding Indonesia",
          email: "dicoding@gmail.com",
        })
      );
    });
  });

  describe("getPasswordByUsername", () => {
    it("should throw InvariantError when user not found", () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getPasswordByUsername("dicoding")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return username password when user is found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: "secret_password",
      });

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByUsername(
        "dicoding"
      );
      expect(password).toBe("secret_password");
    });
  });

  describe("getIdByUsername", () => {
    it("should throw InvariantError when user not found", () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getIdByUsername("dicoding")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return username id when user is found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      });

      // Action
      const userId = await userRepositoryPostgres.getIdByUsername("dicoding");

      // Assert
      expect(userId).toEqual("user-123");
    });
  });

  describe("getPasswordByEmail", () => {
    it("should throw AuthenticationError when user not found", () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getPasswordByEmail("dicoding")
      ).rejects.toThrowError(AuthenticationError);
    });

    it("should return email password when user is found", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      });

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByEmail(
        "dicoding@gmail.com"
      );

      expect(password).toBe("secret12345");
    });
  });

  describe("getIdByEmail", () => {
    it("should throw InvariantError when user not found", () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getIdByEmail("dicoding")
      ).rejects.toThrowError(InvariantError);
    });
  });

  describe("verifyAvailableEmail", () => {
    it("should throw InvariantError when email not available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ email: "testuser@mail.com" });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableEmail("testuser@mail.com")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when email available", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableEmail("test@mail.com")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("getUserList", () => {
    it("should return user list correctly", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      });

      // Action
      const userList = await userRepositoryPostgres.getUserList();

      // Assert
      expect(userList).toHaveLength(1);
      expect(userList[0]).toStrictEqual({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      });
    });
  });

  describe("getOwnUserProfile", () => {
    it("should throw InvariantError when user not found", () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        userRepositoryPostgres.getOwnUserProfile("user-123")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user profile correctly", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      });

      // Action
      const userProfile = await userRepositoryPostgres.getOwnUserProfile(
        "user-123"
      );

      // Assert
      expect(userProfile).toStrictEqual({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      });
    });
  });

  describe("verifyAvailableUser", () => {
    it("should throw InvariantError when username not available", async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUser("")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when username available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
      });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        userRepositoryPostgres.verifyAvailableUser("user-123")
      ).resolves.not.toThrowError(InvariantError);
    });
  });
});
