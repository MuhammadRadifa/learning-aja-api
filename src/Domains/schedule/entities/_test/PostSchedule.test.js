const PostSchedule = require("../PostSchedule");

describe("a PostSchedule entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new PostSchedule(payload)).toThrowError(
      "POST_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      title: 123,
      lecturer: {},
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostSchedule(payload)).toThrowError(
      "POST_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when title contains more than 50 characters", () => {
    // Arrange
    const payload = {
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,",
      lecturer: "abc",
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostSchedule(payload)).toThrowError(
      "POST_SCHEDULE.TITLE_LIMIT_CHAR"
    );
  });

  it("should throw error when lecturer contains more than 50 characters", () => {
    // Arrange
    const payload = {
      title: "abc",
      lecturer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,",
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostSchedule(payload)).toThrowError(
      "POST_SCHEDULE.LECTURER_LIMIT_CHAR"
    );
  });

  it("should throw error when room contains more than 50 characters", () => {
    // Arrange
    const payload = {
      title: "abc",
      lecturer: "abc",
      room: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
    };

    // Action and Assert
    expect(() => new PostSchedule(payload)).toThrowError(
      "POST_SCHEDULE.ROOM_LIMIT_CHAR"
    );
  });

  it("should create PostSchedule object correctly", () => {
    // Arrange
    const payload = {
      title: "abc",
      lecturer: "abc",
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "abc",
    };

    // Action
    const { title, lecturer, room, classTime, schedule, ownerId } =
      new PostSchedule(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(lecturer).toEqual(payload.lecturer);
    expect(room).toEqual(payload.room);
    expect(classTime).toEqual(payload.classTime);
    expect(schedule).toEqual(payload.schedule);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
