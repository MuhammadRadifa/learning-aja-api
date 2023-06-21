const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const DeleteMeetingUseCase = require("../DeleteMeetingUseCase");

describe("DeleteMeetingUseCase", () => {
  it("should orchestrating the delete meeting action correctly", async () => {
    const useCasePayload = {
      meetingId: "meeting-123",
      ownerId: "user-123",
    };

    const mockMeetingRepository = new MeetingRepository();

    mockMeetingRepository.checkAvailablitiyMeeting = jest.fn(() =>
      Promise.resolve()
    );
    mockMeetingRepository.verifyMeetingOwner = jest.fn(() => Promise.resolve());

    mockMeetingRepository.deleteMeeting = jest.fn(() => Promise.resolve());

    const deleteMeetingUseCase = new DeleteMeetingUseCase({
      meetingRepository: mockMeetingRepository,
    });

    await deleteMeetingUseCase.execute(useCasePayload);

    expect(mockMeetingRepository.checkAvailablitiyMeeting).toBeCalledWith(
      useCasePayload.meetingId
    );

    expect(mockMeetingRepository.verifyMeetingOwner).toBeCalledWith(
      useCasePayload.meetingId,
      useCasePayload.ownerId
    );

    expect(mockMeetingRepository.deleteMeeting).toBeCalledWith(
      useCasePayload.meetingId
    );
  });
});
