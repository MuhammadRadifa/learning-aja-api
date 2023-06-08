const TodoRepository = require("../../Domains/todolist/TodoRepository");
const PostedTodo = require("../../Domains/todolist/entities/PostedTodo");
const NotFoundError = require("../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/Exceptions/AuthorizationError");

class TodoRepositoryPostgres extends TodoRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addTodo({ title, content, status = "unfinished", ownerId }) {
    const id = `todo-${this._idGenerator()}`;
    const date = ``;
    const query = {
      text: `INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, content, "ownerId"`,
      values: [id, title, content, status, date, ownerId],
    };
    const result = await this._pool.query(query);
    return new PostedTodo({
      ...result.rows[0],
    });
  }

  async getTodoById(id) {
    const query = {
      text: "SELECT * FROM notes WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("todo tidak ditemukan");
    }
    return result.rows.map((row) => new PostedTodo({ ...row }))[0];
  }

  async verifyTodoOwner(id, ownerId) {
    const query = {
      text: `SELECT id FROM notes WHERE id = $1 AND "ownerId" = $2`,
      values: [id, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak berhak mengakses resource ini");
    }
  }

  async deleteTodoById(id) {
    const query = {
      text: "DELETE FROM notes WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("todo tidak ditemukan");
    }
  }

  async getTodoDetail(id) {
    const query = {
      text: `SELECT notes.id, title, content, notes."ownerId" FROM notes INNER JOIN users ON notes."ownerId" = users.id WHERE notes.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("todo tidak ditemukan");
    }

    return new PostedTodo({
      ...result.rows[0],
    });
  }
}

module.exports = TodoRepositoryPostgres;
