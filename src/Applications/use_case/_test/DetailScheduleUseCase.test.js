const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const DetailScheduleUseCase = require("../DetailScheduleUseCase");

describe("DetailScheduleUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const mockScheduleRepository = new ScheduleRepository();

    const detailScheduleUseCase = new DetailScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    await expect(
      detailScheduleUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DETAIL_SCHEDULE_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      id: 123,
      ownerId: true,
    };

    const mockScheduleRepository = new ScheduleRepository();

    const detailScheduleUseCase = new DetailScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    await expect(
      detailScheduleUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DETAIL_SCHEDULE_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

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
