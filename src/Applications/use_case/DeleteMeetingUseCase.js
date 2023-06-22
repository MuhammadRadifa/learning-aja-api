class DeleteMeetingUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { meetingId, ownerId } = useCasePayload;
    await this._meetingRepository.checkAvailablitiyMeeting(meetingId);
    await this._meetingRepository.verifyMeetingOwner(meetingId, ownerId);
    await this._meetingRepository.deleteMeeting(meetingId);
  }

  _validatePayload(payload) {
    const { meetingId, ownerId } = payload;
    if (!meetingId || !ownerId) {
      throw new Error("DELETE_MEETING_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof meetingId !== "string" || typeof ownerId !== "string") {
      throw new Error(
        "DELETE_MEETING_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = DeleteMeetingUseCase;
