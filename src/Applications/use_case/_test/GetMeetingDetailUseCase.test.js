const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const PostedMeeting = require("../../../Domains/meeting/entities/PostedMeeting");
const GetMeetingDetailUseCase = require("../GetMeetingDetailUseCase");

describe("GetMeetingDetailUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const getMeetingDetailUseCase = new GetMeetingDetailUseCase({
      meetingRepository: new MeetingRepository(),
    });

    await expect(
      getMeetingDetailUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_MEETING_DETAIL_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      meetingId: 123,
    };

    const getMeetingDetailUseCase = new GetMeetingDetailUseCase({
      meetingRepository: new MeetingRepository(),
    });

    await expect(
      getMeetingDetailUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_MEETING_DETAIL_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the get meeting detail action correctly", async () => {
    const useCasePayload = {
      meetingId: "meeting-123",
    };

    const expectedMeeting = new PostedMeeting({
      id: "meeting-123",
      title: "Dicoding Indonesia",
      description: "Dicoding Indonesia",
      date: "2021-08-08",
      time: "12:00",
      location: "Dicoding Indonesia",
      ownerId: "user-123",
      createdAt: "2021-08-08T07:22:33.555Z",
    });

    const mockMeetingRepository = new MeetingRepository();

    mockMeetingRepository.checkAvailablitiyMeeting = jest.fn(() =>
      Promise.resolve()
    );

    mockMeetingRepository.getMeetingById = jest.fn(() =>
      Promise.resolve(expectedMeeting)
    );

    const getMeetingDetailUseCase = new GetMeetingDetailUseCase({
      meetingRepository: mockMeetingRepository,
    });

    const meeting = await getMeetingDetailUseCase.execute(useCasePayload);

    expect(meeting).toStrictEqual(expectedMeeting);
  });
});
