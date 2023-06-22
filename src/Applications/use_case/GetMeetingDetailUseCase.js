class GetMeetingDetailUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { meetingId } = useCasePayload;
    await this._meetingRepository.checkAvailablitiyMeeting(meetingId);
    return this._meetingRepository.getMeetingById(meetingId);
  }

  _validatePayload(payload) {
    const { meetingId } = payload;
    if (!meetingId) {
      throw new Error("GET_MEETING_DETAIL_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof meetingId !== "string") {
      throw new Error(
        "GET_MEETING_DETAIL_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = GetMeetingDetailUseCase;
