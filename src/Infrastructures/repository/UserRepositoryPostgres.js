const InvariantError = require("../../Commons/Exceptions/invariantError");
const AuthenticationError = require("../../Commons/Exceptions/AuthenticationError");
const RegisteredUser = require("../../Domains/user/entities/RegisteredUser");
const UserRepository = require("../../Domains/user/UserRepository");

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  async addUser(registerUser) {
    const { username, password, fullname, email } = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id, username, fullname, email",
      values: [id, username, password, fullname, email],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }

  async getPasswordByUsername(username) {
    const query = {
      text: "SELECT password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.rows[0].password;
  }

  async getPasswordByEmail(email) {
    const query = {
      text: "SELECT password FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError("email tidak ditemukan");
    }

    return result.rows[0].password;
  }

  async getIdByUsername(username) {
    const query = {
      text: "SELECT id FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.rows[0].id;
  }

  async getIdByEmail(email) {
    const query = {
      text: "SELECT id FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("email tidak ditemukan");
    }

    return result.rows[0].id;
  }

  async verifyAvailableEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("email tidak tersedia");
    }
  }

  async getUserList() {
    const query = {
      text: "SELECT id, username, fullname FROM users",
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getOwnUserProfile(id) {
    const query = {
      text: "SELECT id, username, fullname FROM users WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result.rows[0];
  }
}

module.exports = UserRepositoryPostgres;
