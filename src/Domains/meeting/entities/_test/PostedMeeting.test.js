const PostedMeeting = require("../PostedMeeting");

describe("a PostedMeeting entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new PostedMeeting(payload)).toThrowError(
      "POSTED_MEETING.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: 123,
      description: {},
      date: "abc",
      time: "abc",
      location: "abc",
      ownerId: "abc",
      createdAt: "abc",
    };

    // Action and Assert
    expect(() => new PostedMeeting(payload)).toThrowError(
      "POSTED_MEETING.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostedMeeting object correctly", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: "abc",
      description: "abc",
      date: "2021-08-08",
      time: "12:00",
      location: "abc",
      ownerId: "abc",
      createdAt: "2021-08-08T07:22:33.555Z",
    };

    // Action
    const { title, description, date, time, location, ownerId, createdAt } =
      new PostedMeeting(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(description).toEqual(payload.description);
    expect(date).toEqual(payload.date);
    expect(time).toEqual(payload.time);
    expect(location).toEqual(payload.location);
    expect(ownerId).toEqual(payload.ownerId);
    expect(createdAt).toEqual(payload.createdAt);
  });
});
