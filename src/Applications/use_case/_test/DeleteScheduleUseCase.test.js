const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const DeleteScheduleUseCase = require("../DeleteScheduleUseCase");

describe("DeleteScheduleUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    // Arrange
    const useCasePayload = {};

    /** creating dependency of use case */
    const mockScheduleRepository = new ScheduleRepository();

    /** creating use case instance */
    const deleteScheduleUseCase = new DeleteScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    // Action & Assert
    await expect(
      deleteScheduleUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DELETE_SCHEDULE_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    // Arrange
    const useCasePayload = {
      scheduleId: 123,
      ownerId: true,
    };

    /** creating dependency of use case */
    const mockScheduleRepository = new ScheduleRepository();

    /** creating use case instance */
    const deleteScheduleUseCase = new DeleteScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    // Action & Assert
    await expect(
      deleteScheduleUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DELETE_SCHEDULE_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

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
