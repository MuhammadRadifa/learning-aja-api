const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const DeleteScheduleUseCase = require("../DeleteScheduleUseCase");

describe("DeleteScheduleUseCase", () => {
  it("should orchestrating the delete schedule action correctly", async () => {
    // Arrange
    const useCasePayload = {
      scheduleId: "schedule-123",
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
    mockScheduleRepository.deleteScheduleById = jest.fn(() =>
      Promise.resolve()
    );

    /** creating use case instance */
    const deleteScheduleUseCase = new DeleteScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    // Action
    await deleteScheduleUseCase.execute(useCasePayload);

    // Assert
    expect(mockScheduleRepository.verifyScheduleOwner).toBeCalledWith(
      useCasePayload.scheduleId,
      useCasePayload.ownerId
    );
  });
});
