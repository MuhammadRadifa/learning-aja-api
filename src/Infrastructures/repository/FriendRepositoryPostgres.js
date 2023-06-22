const FriendRepository = require("../../Domains/friend/FriendRepository");
const NotFoundError = require("../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/Exceptions/AuthorizationError");
const InvariantError = require("../../Commons/Exceptions/InvariantError");

class FriendRepositoryPostgres extends FriendRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addFriend(userId, friendId) {
    const query = {
      text: `INSERT INTO "waitingList" VALUES($1, $2) RETURNING "senderId", "receiverId"`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async acceptFriend(userId, friendId) {
    const query = {
      text: `INSERT INTO "friendList" VALUES($1, $2) RETURNING "userId", "friendId"`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async rejectFriend(userId, friendId) {
    const query = {
      text: `DELETE FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2 RETURNING "senderId", "receiverId"`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthorizationError(
        "Anda tidak memiliki akses untuk mengakses resource ini"
      );
    }

    return result.rows[0];
  }

  async blockFriend(userId, friendId) {
    const query = {
      text: `INSERT INTO "blockList" VALUES($1, $2) RETURNING "userId", "blockId"`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getFriendRequestList(userId) {
    const query = {
      text: `SELECT "waitingList"."receiverId", users.username FROM users INNER JOIN "waitingList" ON users.id = "waitingList"."receiverId" WHERE "waitingList"."senderId" = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getFriendList(userId) {
    const query = {
      text: `SELECT "friendList"."friendId" as "userId", users.username FROM users INNER JOIN "friendList" ON users.id = "friendList"."friendId" WHERE "friendList"."userId" = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getBlockList(userId) {
    const query = {
      text: `SELECT "blockList"."blockId" as "userId", users.username FROM users INNER JOIN "blockList" ON users.id = "blockList"."blockId" WHERE "blockList"."userId" = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async unBlockFriend(userId, friendId) {
    const query = {
      text: `DELETE FROM "blockList" WHERE "userId" = $1 AND "blockId" = $2 RETURNING "userId", "blockId"`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async deleteFriend(userId, friendId) {
    const query = {
      text: `DELETE FROM "friendList" WHERE "userId" = $1 AND "friendId" = $2`,
      values: [userId, friendId],
    };

    await this._pool.query(query);
  }

  async checkFriendship(userId, friendId) {
    const query = {
      text: `SELECT * FROM "friendList" WHERE "userId" = $1 AND "friendId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("anda belum berteman dengan user ini");
    }
  }

  async checkFriendRequest(userId, friendId) {
    const query = {
      text: `SELECT * FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("anda belum mengirimkan permintaan pertemanan");
    }
  }

  async checkBlockFriend(userId, friendId) {
    const query = {
      text: `SELECT * FROM "blockList" WHERE "userId" = $1 AND "blockId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("user ini belum anda blokir");
    }
  }

  async verifyAvailableFriend(userId, friendId) {
    const query = {
      text: `SELECT * FROM "friendList" WHERE "userId" = $1 AND "friendId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("anda sudah berteman dengan user ini");
    }
  }

  async verifyFriendRequest(userId, friendId) {
    const query = {
      text: `SELECT * FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("anda sudah mengirimkan permintaan pertemanan");
    }
  }

  async verifyAvailableFriendRequest(userId, friendId) {
    const query = {
      text: `SELECT * FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak memiliki hak akses");
    }
  }

  async verifyRejectFriendRequest(userId, friendId) {
    const query = {
      text: `SELECT * FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak memiliki hak akses");
    }
  }

  async verifyUserUnblocking(userId, friendId) {
    const query = {
      text: `SELECT * FROM "blockList" WHERE "userId" = $1 AND "blockId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak memiliki hak akses");
    }
  }

  async verifyBlockUser(userId, friendId) {
    const query = {
      text: `SELECT * FROM "blockList" WHERE "userId" = $1 AND "blockId" = $2`,
      values: [userId, friendId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("user ini sudah anda blokir");
    }
  }

  async removeFriendRequest(userId, friendId) {
    const query = {
      text: `DELETE FROM "waitingList" WHERE "senderId" = $1 AND "receiverId" = $2`,
      values: [userId, friendId],
    };

    await this._pool.query(query);
  }
}

module.exports = FriendRepositoryPostgres;
