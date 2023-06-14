class PostSchedule {
  constructor(payload) {
    this._verifyPayload(payload);

    const { title, lecturer, room, classTime, schedule, ownerId } = payload;

    this.title = title;
    this.lecturer = lecturer;
    this.room = room;
    this.classTime = classTime;
    this.schedule = schedule;
    this.ownerId = ownerId;
  }

  _verifyPayload({ title, lecturer, room, classTime, schedule, ownerId }) {
    if (!title || !lecturer || !room || !classTime || !schedule || !ownerId) {
      throw new Error("POST_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof title !== "string" ||
      typeof lecturer !== "string" ||
      typeof room !== "string" ||
      typeof classTime !== "string" ||
      typeof schedule !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("POST_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (title.length > 50) {
      throw new Error("POST_SCHEDULE.TITLE_LIMIT_CHAR");
    }

    if (lecturer.length > 50) {
      throw new Error("POST_SCHEDULE.LECTURER_LIMIT_CHAR");
    }

    if (room.length > 50) {
      throw new Error("POST_SCHEDULE.ROOM_LIMIT_CHAR");
    }
  }
}

module.exports = PostSchedule;
