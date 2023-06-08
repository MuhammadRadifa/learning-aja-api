/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const UsersTableTestHelper = {
  async addNotes({
    id = "note-123",
    title = "testnote",
    content = "testnote",
    status = "Dicoding Indonesia",
    ownerId = "user-123",
  }) {
    const query = {
      text: "INSERT INTO notes VALUES($1, $2, $3, $4, $6)",
      values: [id, title, content, status, ownerId],
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

module.exports = UsersTableTestHelper;
