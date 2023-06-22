/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const FriendTableTestHelper = {
  async addFriend({ userId = "user-123", friendId = "user-321" }) {
    const query = {
      text: `INSERT INTO "waitingList" VALUES($1, $2)`,
      values: [userId, friendId],
    };

    await pool.query(query);
  },

  async acceptFriend({ userId = "user-123", friendId = "user-321" }) {
    const query = {
      text: `INSERT INTO "friendList" VALUES($1, $2)`,
      values: [userId, friendId],
    };

    await pool.query(query);
  },

  async rejectFriend({ userId = "user-123", friendId = "user-321" }) {
    const query = {
      text: `DELETE FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2`,
      values: [userId, friendId],
    };

    await pool.query(query);
  },

  async blockFriend({ userId = "user-123", friendId = "user-321" }) {
    const query = {
      text: `INSERT INTO "blockList" VALUES($1, $2)`,
      values: [userId, friendId],
    };

    await pool.query(query);
  },

  async findFriendsById(userId) {
    const query = {
      text: `SELECT * FROM "friendList" WHERE "userId" = $1`,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async getFriendList(userId) {
    const query = {
      text: `SELECT * FROM "friendList" WHERE "userId" = $1`,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async getBlockList(userId) {
    const query = {
      text: `SELECT * FROM "blockList" WHERE "userId" = $1`,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async getFriendRequestList(userId) {
    const query = {
      text: `SELECT * FROM "waitingList" WHERE "senderId" = $1`,
      values: [userId],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async checkFriendship(userId, friendId) {
    const query = {
      text: `SELECT * FROM "friendList" WHERE "userId" = $1 AND "friendId" = $2`,
      values: [userId, friendId],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async checkBlockList(userId, friendId) {
    const query = {
      text: `SELECT * FROM "blockList" WHERE "userId" = $1 AND "blockId" = $2`,
      values: [userId, friendId],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query(`DELETE FROM "friendList" WHERE 1=1`);
    await pool.query(`DELETE FROM "waitingList" WHERE 1=1`);
    await pool.query(`DELETE FROM "blockList" WHERE 1=1`);
  },
};

module.exports = FriendTableTestHelper;
