const MeetingRepository = require("../MeetingRepository");

describe("MeetingRepository interface", () => {
  it("should throw error when invoke unimplemented method", async () => {
    // Arrange
    const meetingRepository = new MeetingRepository();

    // Action & Assert
    await expect(
      meetingRepository.addMeeting({
        title: "abc",
        description: "abc",
        date: "2021-08-08",
        time: "12:00",
        location: "abc",
        userId: "abc",
      })
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(meetingRepository.getMeetingById("abc")).rejects.toThrowError(
      "MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );

    await expect(
      meetingRepository.getMeetingByUserId("abc")
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      meetingRepository.checkAvailablitiyMeeting("abc")
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      meetingRepository.verifyMeetingOwner("abc", "abc")
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      meetingRepository.addParticipantToMeeting("abc", "abc")
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      meetingRepository.verifyMeetingParticipantByMeetingId("abc", "abc")
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      meetingRepository.deleteMeetingById("abc")
    ).rejects.toThrowError("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
