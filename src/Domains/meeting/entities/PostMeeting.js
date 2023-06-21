class PostMeeting {
  constructor(payload) {
    this._verifyPayload(payload);
    const { title, description, date, time, location, ownerId } = payload;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.location = location;
    this.ownerId = ownerId;
  }

  _verifyPayload({ title, description, date, time, location, ownerId }) {
    if (!title || !description || !date || !time || !location || !ownerId) {
      throw new Error("POST_MEETING.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      typeof location !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("POST_MEETING.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PostMeeting;
