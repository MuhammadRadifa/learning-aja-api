/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const MeetingTableTestHelper = {
  async addMeeting({
    id = "meeting-123",
    title = "meeting",
    description = "description meeting",
    date = "2021-08-08",
    time = "08:00:00",
    location = "location meeting",
    ownerId = "user-123",
    createdAt = "2021-08-08T07:22:33.555Z",
  }) {
    const query = {
      text: "INSERT INTO meeting VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        id,
        title,
        description,
        date,
        time,
        location,
        ownerId,
        createdAt,
      ],
    };

    await pool.query(query);
  },

  async findMeetingById(id) {
    const query = {
      text: "SELECT * FROM meeting WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM meeting WHERE 1=1");
  },
};

module.exports = MeetingTableTestHelper;
