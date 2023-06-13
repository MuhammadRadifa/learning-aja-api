const PostedSchedule = require("../PostedSchedule");

describe("a PostedSchedule entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new PostedSchedule(payload)).toThrowError(
      "POSTED_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: 123,
      lecturer: {},
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
      createdAt: "2021-08-08T07:22:22.000Z",
    };

    // Action and Assert
    expect(() => new PostedSchedule(payload)).toThrowError(
      "POSTED_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostedSchedule object correctly", () => {
    // Arrange
    const payload = {
      id: "abc",
      title: "abc",
      lecturer: "abc",
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
      createdAt: "2021-08-08T07:22:22.000Z",
    };

    // Action
    const { id, title, lecturer, room, classTime, schedule, ownerId } =
      new PostedSchedule(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(lecturer).toEqual(payload.lecturer);
    expect(room).toEqual(payload.room);
    expect(classTime).toEqual(payload.classTime);
    expect(schedule).toEqual(payload.schedule);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
