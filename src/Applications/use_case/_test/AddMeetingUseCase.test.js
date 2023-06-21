const PostedMeeting = require("../../../Domains/meeting/entities/PostedMeeting");
const PostMeeting = require("../../../Domains/meeting/entities/PostMeeting");
const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const AddMeetingUseCase = require("../AddMeetingUseCase");

describe("AddMeetingUseCase", () => {
  it("should orchestrating the add meeting action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "abc",
      description: "abc",
      date: "2021-08-08",
      time: "12:00",
      location: "abc",
      ownerId: "user-123",
      createdAt: "2021-08-08T07:22:33.555Z",
    };

    const expectedPostedMeeting = new PostedMeeting({
      id: "meeting-123",
      title: useCasePayload.title,
      description: useCasePayload.description,
      date: useCasePayload.date,
      time: useCasePayload.time,
      location: useCasePayload.location,
      ownerId: useCasePayload.ownerId,
      createdAt: useCasePayload.createdAt,
    });

    /** creating dependency of use case */
    const mockMeetingRepository = new MeetingRepository();

    /** mocking needed function */
    mockMeetingRepository.addMeeting = jest.fn(() =>
      Promise.resolve(expectedPostedMeeting)
    );

    mockMeetingRepository.addParticipantToMeeting = jest.fn(() =>
      Promise.resolve()
    );

    /** creating use case instance */
    const addMeetingUseCase = new AddMeetingUseCase({
      meetingRepository: mockMeetingRepository,
    });

    // Action
    const postedMeeting = await addMeetingUseCase.execute(useCasePayload);

    // Assert
    expect(postedMeeting).toStrictEqual(expectedPostedMeeting);
    expect(mockMeetingRepository.addMeeting).toBeCalledWith(
      new PostMeeting(useCasePayload)
    );
  });
});
