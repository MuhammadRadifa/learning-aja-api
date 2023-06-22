class GetMeetingUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { id } = useCasePayload;
    await this._meetingRepository.checkAvailablitiyMeeting(id);
    return this._meetingRepository.getMeetingById(id);
  }

  _validatePayload(payload) {
    const { id } = payload;
    if (!id) {
      throw new Error("GET_MEETING_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof id !== "string") {
      throw new Error(
        "GET_MEETING_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = GetMeetingUseCase;
