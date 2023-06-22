const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const DeleteMeetingUseCase = require("../DeleteMeetingUseCase");

describe("DeleteMeetingUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const mockMeetingRepository = new MeetingRepository();

    const deleteMeetingUseCase = new DeleteMeetingUseCase({
      meetingRepository: mockMeetingRepository,
    });

    await expect(
      deleteMeetingUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DELETE_MEETING_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      meetingId: 123,
      ownerId: true,
    };

    const mockMeetingRepository = new MeetingRepository();

    const deleteMeetingUseCase = new DeleteMeetingUseCase({
      meetingRepository: mockMeetingRepository,
    });

    await expect(
      deleteMeetingUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DELETE_MEETING_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

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
