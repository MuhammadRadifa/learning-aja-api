class PostedMeeting {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, description, date, time, location, ownerId, createdAt } =
      payload;

    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.location = location;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
  }

  _verifyPayload({
    id,
    title,
    description,
    date,
    time,
    location,
    ownerId,
    createdAt,
  }) {
    if (
      !id ||
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !ownerId ||
      !createdAt
    ) {
      throw new Error("POSTED_MEETING.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      typeof location !== "string" ||
      typeof ownerId !== "string" ||
      typeof createdAt !== "string"
    ) {
      throw new Error("POSTED_MEETING.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PostedMeeting;
