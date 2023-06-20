const PostMeeting = require("../../../Domains/meeting/entities/PostMeeting");
const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const GetUserMeetingUseCase = require("../GetUserMeetingUseCase");

describe("GetUserMeetingUseCase", () => {
  it("should orchestrating the get user meeting action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
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
        createdAt: "2021-08-08T07:22:33.555Z",
      }),
    ];

    /** creating dependency of use case */
    const mockMeetingRepository = new MeetingRepository();

    /** mocking needed function */
    mockMeetingRepository.getMeetingByUserId = jest.fn(() =>
      Promise.resolve(expectedMeeting)
    );

    /** creating use case instance */
    const getMeetingUseCase = new GetUserMeetingUseCase({
      meetingRepository: mockMeetingRepository,
    });

    // Action
    const meeting = await getMeetingUseCase.execute(useCasePayload);

    // Assert
    expect(meeting).toStrictEqual(expectedMeeting);
    expect(mockMeetingRepository.getMeetingByUserId).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
