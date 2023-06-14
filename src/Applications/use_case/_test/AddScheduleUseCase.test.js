const PostedSchedule = require("../../../Domains/schedule/entities/PostedSchedule");
const PostSchedule = require("../../../Domains/schedule/entities/PostSchedule");
const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const AddScheduleUseCase = require("../AddScheduleUseCase");

describe("AddScheduleUseCase", () => {
  it("should orchestrating the add schedule action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "abc",
      lecturer: "abc",
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "user-123",
    };

    const expectedPostedSchedule = new PostedSchedule({
      id: "schedule-123",
      title: useCasePayload.title,
      lecturer: useCasePayload.lecturer,
      room: useCasePayload.room,
      classTime: useCasePayload.classTime,
      schedule: useCasePayload.schedule,
      ownerId: useCasePayload.ownerId,
      createdAt: "2021-08-08T07:22:22.000Z",
    });

    /** creating dependency of use case */
    const mockScheduleRepository = new ScheduleRepository();

    /** mocking needed function */
    mockScheduleRepository.addSchedule = jest.fn(() =>
      Promise.resolve(expectedPostedSchedule)
    );

    /** creating use case instance */
    const getScheduleUseCase = new AddScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    // Action
    const postedSchedule = await getScheduleUseCase.execute(useCasePayload);

    // Assert
    expect(postedSchedule).toStrictEqual(expectedPostedSchedule);
    expect(mockScheduleRepository.addSchedule).toBeCalledWith(
      new PostSchedule(useCasePayload)
    );
  });
});
