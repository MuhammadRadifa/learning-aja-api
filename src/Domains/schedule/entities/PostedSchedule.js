class PostedSchedule {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      title,
      lecturer,
      room,
      classTime,
      schedule,
      ownerId,
      createdAt,
    } = payload;

    this.id = id;
    this.title = title;
    this.lecturer = lecturer;
    this.room = room;
    this.classTime = classTime;
    this.ownerId = ownerId;
    this.schedule = schedule;
    this.createdAt = createdAt;
  }

  _verifyPayload({ id, title, lecturer, room, classTime, schedule, ownerId }) {
    if (
      !id ||
      !title ||
      !lecturer ||
      !room ||
      !classTime ||
      !schedule ||
      !ownerId
    ) {
      throw new Error("POSTED_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof lecturer !== "string" ||
      typeof room !== "string" ||
      typeof classTime !== "string" ||
      typeof schedule !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("POSTED_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PostedSchedule;
