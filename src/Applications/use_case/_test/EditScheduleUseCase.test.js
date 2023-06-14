const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const EditScheduleUseCase = require("../EditScheduleUseCase");
const PostedSchedule = require("../../../Domains/schedule/entities/PostedSchedule");

describe("EditScheduleUseCase", () => {
  it("should orchestrating the edit schedule action correctly", async () => {
    // Arrange
    const useCasePayload = {
      id: "schedule-123",
      title: "abc",
      lecturer: "abc",
      room: "abc",
      classTime: "abc",
      schedule: "abc",
      ownerId: "user-123",
    };

    /** creating dependency of use case */
    const mockScheduleRepository = new ScheduleRepository();

    /** mocking needed function */
    mockScheduleRepository.checkAvailabilitySchedule = jest.fn(() =>
      Promise.resolve()
    );
    mockScheduleRepository.verifyScheduleOwner = jest.fn(() =>
      Promise.resolve()
    );
    mockScheduleRepository.editScheduleById = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const editScheduleUseCase = new EditScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    // Action
    await editScheduleUseCase.execute(useCasePayload);

    // Assert
    expect(mockScheduleRepository.verifyScheduleOwner).toBeCalledWith(
      useCasePayload.id,
      useCasePayload.ownerId
    );
    expect(mockScheduleRepository.editScheduleById).toBeCalledWith(
      new PostedSchedule(useCasePayload)
    );
  });
});
