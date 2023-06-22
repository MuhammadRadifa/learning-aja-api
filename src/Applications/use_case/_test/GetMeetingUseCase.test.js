const PostMeeting = require("../../../Domains/meeting/entities/PostMeeting");
const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const GetMeetingUseCase = require("../GetMeetingUseCase");

describe("GetMeetingUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const getMeetingUseCase = new GetMeetingUseCase({
      meetingRepository: new MeetingRepository(),
    });

    await expect(
      getMeetingUseCase.execute(useCasePayload)
    ).rejects.toThrowError("GET_MEETING_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      id: 123,
    };

    const getMeetingUseCase = new GetMeetingUseCase({
      meetingRepository: new MeetingRepository(),
    });

    await expect(
      getMeetingUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_MEETING_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the get meeting action correctly", async () => {
    const useCasePayload = {
      id: "meeting-123",
    };

    const expectedMeeting = [
      new PostMeeting({
        id: "meeting-123",
        title: "Dicoding Indonesia",
        description: "Dicoding Indonesia",
        date: "2021-08-08",
        time: "12:00",
        location: "Dicoding Indonesia",
        ownerId: "user-123",
      }),
    ];

    const mockMeetingRepository = new MeetingRepository();

    mockMeetingRepository.checkAvailablitiyMeeting = jest.fn(() =>
      Promise.resolve()
    );

    mockMeetingRepository.getMeetingById = jest.fn(() =>
      Promise.resolve(expectedMeeting)
    );

    const getMeetingUseCase = new GetMeetingUseCase({
      meetingRepository: mockMeetingRepository,
    });

    const meeting = await getMeetingUseCase.execute(useCasePayload);

    expect(meeting).toStrictEqual(expectedMeeting);
    expect(mockMeetingRepository.getMeetingById).toBeCalledWith(
      useCasePayload.id
    );
  });
});
