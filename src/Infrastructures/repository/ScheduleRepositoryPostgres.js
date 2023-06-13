const ScheduleRepository = require("../../Domains/schedule/ScheduleRepository");
const PostedSchedule = require("../../Domains/schedule/entities/PostedSchedule");
const NotFoundError = require("../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/Exceptions/AuthorizationError");

class ScheduleRepositoryPostgres extends ScheduleRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addSchedule({ title, lecturer, room, classTime, schedule, ownerId }) {
    const id = `schedule-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const query = {
      text: `INSERT INTO schedules VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, title, lecturer, room, "classTime", schedule, "ownerId", "createdAt"`,
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

    const result = await this._pool.query(query);

    return new PostedSchedule({
      ...result.rows[0],
    });
  }

  async getScheduleById(id) {
    const query = {
      text: "SELECT * FROM schedules WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("schedule tidak ditemukan");
    }

    return result.rows.map((row) => new PostedSchedule({ ...row }))[0];
  }

  async verifyScheduleOwner(id, ownerId) {
    const query = {
      text: `SELECT id FROM schedules WHERE id = $1 AND "ownerId" = $2`,
      values: [id, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak berhak mengakses resource ini");
    }
  }

  async deleteScheduleById(id) {
    const query = {
      text: "DELETE FROM schedules WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("schedule tidak ditemukan");
    }
  }

  async getScheduleDetail(id) {
    const query = {
      text: `SELECT schedules.id, schedules.title, schedules.lecturer, schedules.room, schedules."classTime", schedules.schedule, schedules."ownerId", schedules."createdAt", users.username FROM schedules INNER JOIN users ON schedules."ownerId" = users.id WHERE schedules.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("schedule tidak ditemukan");
    }

    return result.rows.map((row) => new PostedSchedule({ ...row }))[0];
  }

  async editScheduleById({
    id,
    title,
    lecturer,
    room,
    classTime,
    schedule,
    ownerId,
  }) {
    const query = {
      text: `UPDATE schedules SET title = $1, lecturer = $2, room = $3, "classTime" = $4, schedule = $5 WHERE id = $6 AND "ownerId" = $7 RETURNING id, title, lecturer, room, "classTime", schedule, "ownerId", "createdAt"`,
      values: [title, lecturer, room, classTime, schedule, id, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("schedule tidak ditemukan");
    }

    return new PostedSchedule({
      ...result.rows[0],
    });
  }

  async getUserScheduleList(ownerId) {
    const query = {
      text: `SELECT * FROM schedules WHERE "ownerId" = $1`,
      values: [ownerId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => new PostedSchedule({ ...row }));
  }

  async checkAvailabilitySchedule(id) {
    const query = {
      text: `SELECT id FROM schedules WHERE id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("schedule tidak ditemukan");
    }
  }
}

module.exports = ScheduleRepositoryPostgres;
