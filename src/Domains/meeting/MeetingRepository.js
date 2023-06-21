class MeetingRepository {
  async addMeeting() {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getMeetingById(meetingId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getMeetingByUserId(userId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkAvailablitiyMeeting(meetingId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyMeetingOwner(meetingId, ownerId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async addParticipantToMeeting(meetingId, participantId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyMeetingParticipantByMeetingId(meetingId, participantId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteMeetingById(meetingId) {
    throw new Error("MEETING_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = MeetingRepository;
