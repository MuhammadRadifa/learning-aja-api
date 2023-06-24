const FriendRepository = require("../../../Domains/friend/FriendRepository");
const FriendRepositoryPostgres = require("../FriendRepositoryPostgres");
const FriendTableTestHelper = require("../../../../tests/FriendTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const pool = require("../../database/postgres/pool");
const NotFoundError = require("../../../Commons/Exceptions/NotFoundError");
const InvariantError = require("../../../Commons/Exceptions/InvariantError");
const AuthorizationError = require("../../../Commons/Exceptions/AuthorizationError");

describe("FriendRepositoryPostgres", () => {
  it("should be instance of FriendRepository domain", () => {
    const friendRepositoryPostgres = new FriendRepositoryPostgres({}, {});

    expect(friendRepositoryPostgres).toBeInstanceOf(FriendRepository);
  });

  describe("behavior test", () => {
    afterEach(async () => {
      await FriendTableTestHelper.cleanTable();
      await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe("addFriend function", () => {
      it("should persist add friend and return added friend correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const addedFriend = await friendRepositoryPostgres.addFriend(
          userId,
          friendId
        );

        const friendsRequest = await FriendTableTestHelper.getFriendRequestList(
          "user-123"
        );
        expect(friendsRequest).toHaveLength(1);
        expect(addedFriend).toStrictEqual({
          receiverId: friendId,
          senderId: userId,
        });
      });
    });

    describe("acceptFriend function", () => {
      it("should persist accept friend and return accepted friend correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const acceptedFriend = await friendRepositoryPostgres.acceptFriend(
          userId,
          friendId
        );

        const friends = await FriendTableTestHelper.getFriendList("user-123");
        expect(friends).toHaveLength(1);
        expect(acceptedFriend).toStrictEqual({
          userId,
          friendId,
        });
      });
    });

    describe("rejectFriend function", () => {
      it("should throw AuthorizationError when user not found", async () => {
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await expect(
          friendRepositoryPostgres.rejectFriend("user-123", "user-321")
        ).rejects.toThrowError(AuthorizationError);
      });

      it("should persist reject friend and return rejected friend correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const rejectedFriend = await friendRepositoryPostgres.rejectFriend(
          userId,
          friendId
        );

        const friends = await FriendTableTestHelper.getFriendRequestList(
          "user-123"
        );
        expect(friends).toHaveLength(0);
        expect(rejectedFriend).toStrictEqual({
          senderId: userId,
          receiverId: friendId,
        });
      });
    });

    describe("blockFriend function", () => {
      it("should persist block friend and return blocked friend correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const blockedFriend = await friendRepositoryPostgres.blockFriend(
          userId,
          friendId
        );

        const friends = await FriendTableTestHelper.getBlockList("user-123");
        expect(friends).toHaveLength(1);
        expect(blockedFriend).toStrictEqual({
          userId,
          blockId: friendId,
        });
      });
    });

    describe("getFriendRequestList function", () => {
      it("should return friend request list correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const friendRequestList =
          await friendRepositoryPostgres.getFriendRequestList(userId);

        expect(friendRequestList).toHaveLength(1);
        expect(friendRequestList[0]).toStrictEqual({
          receiverId: "user-321",
          username: "dicoding2",
        });
      });
    });

    describe("getFriendList function", () => {
      it("should return friend list correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        await FriendTableTestHelper.acceptFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const friendList = await friendRepositoryPostgres.getFriendList(userId);

        expect(friendList).toHaveLength(1);
        expect(friendList[0]).toStrictEqual({
          userId: "user-321",
          username: "dicoding2",
        });
      });
    });

    describe("getBlockList function", () => {
      it("should return block list correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.blockFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        const blockList = await friendRepositoryPostgres.getBlockList(userId);

        expect(blockList).toHaveLength(1);
        expect(blockList[0]).toStrictEqual({
          userId: "user-321",
          username: "dicoding2",
        });
      });
    });

    describe("unblockFriend function", () => {
      it("should delete block friend correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.blockFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await friendRepositoryPostgres.unBlockFriend(userId, friendId);

        const friends = await FriendTableTestHelper.getBlockList(userId);
        expect(friends).toHaveLength(0);
      });
    });

    describe("deleteFriend function", () => {
      it("should delete friend correctly", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        await FriendTableTestHelper.acceptFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await friendRepositoryPostgres.deleteFriend(userId, friendId);

        const friends = await FriendTableTestHelper.getFriendList(userId);
        expect(friends).toHaveLength(0);
      });
    });

    describe("checkFriendship function", () => {
      it("should throw not found error when friendship not found", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await expect(
          friendRepositoryPostgres.checkFriendship(userId, friendId)
        ).rejects.toThrowError(NotFoundError);
      });

      it("should not throw not found error", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        await FriendTableTestHelper.acceptFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await expect(
          friendRepositoryPostgres.checkFriendship(userId, friendId)
        ).resolves.not.toThrowError(NotFoundError);
      });
    });

    describe("checkBlockFriend function", () => {
      it("should throw not found error when block friend not found", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await expect(
          friendRepositoryPostgres.checkBlockFriend(userId, friendId)
        ).rejects.toThrowError(NotFoundError);
      });

      it("should not throw not found error", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.blockFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await expect(
          friendRepositoryPostgres.checkBlockFriend(userId, friendId)
        ).resolves.not.toThrowError(NotFoundError);
      });
    });

    describe("verifyAvailableFriend function", () => {
      it("should throw InvariantError when user already friend", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);
        await FriendTableTestHelper.acceptFriend(userId, friendId);
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);

        await expect(
          friendRepositoryPostgres.verifyAvailableFriend(userId, friendId)
        ).rejects.toThrowError(InvariantError);
      });
    });

    describe("verifyFriendRequest function", () => {
      it("should throw InvariantError when user already send friend request", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });

        await friendRepositoryPostgres.addFriend(userId, friendId);

        await expect(
          friendRepositoryPostgres.verifyFriendRequest(userId, friendId)
        ).rejects.toThrowError(InvariantError);
      });
    });

    describe("verifyAvailableFriendRequest function", () => {
      it("should throw AuthorizationError when not found", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });

        await expect(
          friendRepositoryPostgres.verifyAvailableFriendRequest(
            userId,
            friendId
          )
        ).rejects.toThrowError(AuthorizationError);
      });
    });

    describe("verifyRejectFriendRequest function", () => {
      it("should throw AuthorizationError when not found", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });

        await expect(
          friendRepositoryPostgres.verifyRejectFriendRequest(userId, friendId)
        ).rejects.toThrowError(AuthorizationError);
      });

      it("should not throw AuthorizationError when found", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });
        await FriendTableTestHelper.addFriend(userId, friendId);

        await expect(
          friendRepositoryPostgres.verifyRejectFriendRequest(userId, friendId)
        ).resolves.not.toThrowError(AuthorizationError);
      });
    });

    describe("verifyUserUnblocking function", () => {
      it("should throw AuthorizationError when not found", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });

        await expect(
          friendRepositoryPostgres.verifyUserUnblocking(userId, friendId)
        ).rejects.toThrowError(AuthorizationError);
      });
    });

    describe("verifyIsYourSelf function", () => {
      it("should throw InvariantError when found", async () => {
        const userId = "user-123";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });

        await expect(
          friendRepositoryPostgres.verifyIsYourSelf(userId, userId)
        ).rejects.toThrowError(InvariantError);
      });
    });

    describe("verifyBlockUser function", () => {
      it("should throw InvariantError when user already block", async () => {
        const userId = "user-123";
        const friendId = "user-321";
        const friendRepositoryPostgres = new FriendRepositoryPostgres(pool);
        await UsersTableTestHelper.addUser({
          id: userId,
          username: "dicoding",
        });
        await UsersTableTestHelper.addUser({
          id: friendId,
          username: "dicoding2",
        });

        await friendRepositoryPostgres.blockFriend(userId, friendId);

        await expect(
          friendRepositoryPostgres.verifyBlockUser(userId, friendId)
        ).rejects.toThrowError(InvariantError);
      });
    });
  });
});
