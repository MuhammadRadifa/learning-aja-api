const MeetingRepository = require("../../Domains/meeting/MeetingRepository");
const PostedMeeting = require("../../Domains/meeting/entities/PostedMeeting");
const NotFoundError = require("../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/Exceptions/AuthorizationError");

class MeetingRepositoryPostgres extends MeetingRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addMeeting({ title, description, date, time, location, ownerId }) {
    const id = `meeting-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO meeting VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, title, description, date, time, location, "ownerId", "createdAt"`,
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

    const result = await this._pool.query(query);

    return new PostedMeeting({
      ...result.rows[0],
    });
  }

  async getMeetingById(meetingId) {
    const query = {
      text: "SELECT * FROM meeting WHERE id = $1",
      values: [meetingId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("meeting tidak ditemukan");
    }

    return result.rows.map((row) => new PostedMeeting({ ...row }))[0];
  }

  async getMeetingByUserId(userId) {
    const query = {
      text: `SELECT meeting.id, meeting.title, meeting.description, meeting.date, meeting.time, meeting.location, meeting."ownerId", meeting."createdAt" FROM meeting JOIN "meetingParticipant" ON meeting.id = "meetingParticipant"."meetingId" WHERE "meetingParticipant"."participantId" = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => new PostedMeeting({ ...row }));
  }

  async checkAvailablitiyMeeting(meetingId) {
    const query = {
      text: `SELECT id as "meetingId" FROM meeting WHERE id = $1`,
      values: [meetingId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("meeting tidak ditemukan");
    }
  }

  async verifyMeetingOwner(meetingId, ownerId) {
    const query = {
      text: `SELECT id FROM meeting WHERE id = $1 AND "ownerId" = $2`,
      values: [meetingId, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak berhak mengakses resource ini");
    }
  }

  async addParticipantToMeeting(meetingId, participantId) {
    const query = {
      text: `INSERT INTO "meetingParticipant" VALUES($1, $2) RETURNING "meetingId", "participantId"`,
      values: [meetingId, participantId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async verifyMeetingParticipantByMeetingId(meetingId, participantId) {
    const query = {
      text: `SELECT "meetingId" FROM "meetingParticipant" WHERE "meetingId" = $1 AND "participantId" = $2`,
      values: [meetingId, participantId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("anda tidak berhak mengakses resource ini");
    }
  }

  async deleteMeeting(meetingId) {
    const query = {
      text: "DELETE FROM meeting WHERE id = $1 RETURNING id",
      values: [meetingId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("meeting tidak ditemukan");
    }
  }
}

module.exports = MeetingRepositoryPostgres;
