/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const ScheduleTableTestHelper = {
  async addSchedule({
    id = "schedule-123",
    title = "testschedule",
    lecturer = "testschedule",
    room = "testschedule",
    classTime = "testschedule",
    schedule = "testschedule",
    ownerId = "user-123",
    createdAt = "2021-08-08T07:22:22.000Z",
  }) {
    const query = {
      text: "INSERT INTO schedules VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        id,
        title,
        lecturer,
        room,
        classTime,
        schedule,
        ownerId,
        createdAt,
      ],
    };

    await pool.query(query);
  },

  async findScheduleById(id) {
    const query = {
      text: "SELECT * FROM schedules WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM schedules WHERE 1=1");
  },
};

module.exports = ScheduleTableTestHelper;
