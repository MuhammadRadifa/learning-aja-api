const PostedSchedule = require("../../../Domains/schedule/entities/PostedSchedule");
const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const GetUserScheduleUseCase = require("../GetUserScheduleUseCase");

describe("GetUserScheduleUseCase", () => {
  it("should orchestrating the get user schedule action correctly", async () => {
    const useCasePayload = {
      userId: "user-123",
    };

    const expectedPostedSchedule = [
      new PostedSchedule({
        id: "schedule-123",
        title: "abc",
        lecturer: "abc",
        room: "abc",
        classTime: "abc",
        schedule: "abc",
        ownerId: "user-123",
        createdAt: "2021-08-08T07:22:22.000Z",
      }),
    ];

    const mockScheduleRepository = new ScheduleRepository();

    mockScheduleRepository.getUserScheduleList = jest.fn(() =>
      Promise.resolve(expectedPostedSchedule)
    );

    const getScheduleUseCase = new GetUserScheduleUseCase({
      scheduleRepository: mockScheduleRepository,
    });

    const postedSchedule = await getScheduleUseCase.execute(useCasePayload);

    expect(postedSchedule).toStrictEqual(expectedPostedSchedule);
    expect(mockScheduleRepository.getUserScheduleList).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
