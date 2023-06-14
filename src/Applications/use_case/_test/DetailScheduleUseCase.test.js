const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const DetailScheduleUseCase = require("../DetailScheduleUseCase");

describe("DetailScheduleUseCase", () => {
  it("should orchestrating the edit schedule action correctly", async () => {
    const useCasePayload = {
      id: "schedule-123",
      ownerId: "user-123",
    };

    const mockScheduleRepository = new ScheduleRepository();

    mockScheduleRepository.checkAvailabilitySchedule = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockScheduleRepository.verifyScheduleOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockScheduleRepository.getScheduleDetail = jest.fn(() => Promise.resolve());

    const detailScheduleUseCase = new DetailScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    await detailScheduleUseCase.execute(useCasePayload);

    expect(mockScheduleRepository.getScheduleDetail).toBeCalledWith(
      useCasePayload.id
    );
  });
});
