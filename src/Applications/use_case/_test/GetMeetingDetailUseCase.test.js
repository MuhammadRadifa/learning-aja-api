const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const PostedMeeting = require("../../../Domains/meeting/entities/PostedMeeting");
const GetMeetingDetailUseCase = require("../GetMeetingDetailUseCase");

describe("GetMeetingDetailUseCase", () => {
  it("should orchestrating the get meeting detail action correctly", async () => {
    const useCasePayload = {
      id: "meeting-123",
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
