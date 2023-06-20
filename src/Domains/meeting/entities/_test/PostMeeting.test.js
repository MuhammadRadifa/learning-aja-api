const PostMeeting = require("../PostMeeting");

describe("a PostMeeting entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new PostMeeting(payload)).toThrowError(
      "POST_MEETING.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      title: 123,
      description: {},
      date: "abc",
      time: "abc",
      location: "abc",
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostMeeting(payload)).toThrowError(
      "POST_MEETING.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostMeeting object correctly", () => {
    // Arrange
    const payload = {
      title: "abc",
      description: "abc",
      date: "2021-08-08",
      time: "12:00",
      location: "abc",
      ownerId: "abc",
    };

    // Action
    const { title, description, date, time, location, ownerId } =
      new PostMeeting(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(description).toEqual(payload.description);
    expect(date).toEqual(payload.date);
    expect(time).toEqual(payload.time);
    expect(location).toEqual(payload.location);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
