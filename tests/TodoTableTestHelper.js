/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const TodoTableTestHelper = {
  async addNotes({
    id = "note-123",
    title = "testnote",
    content = "testnote",
    status = "unfinished",
    createdAt = new Date().toISOString(),
    ownerId = "user-123",
  }) {
    const query = {
      text: "INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, title, content, status, createdAt, ownerId],
    };

    await pool.query(query);
  },

  async findNotesById(id) {
    const query = {
      text: "SELECT * FROM notes WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM notes WHERE 1=1");
  },
};

module.exports = TodoTableTestHelper;
