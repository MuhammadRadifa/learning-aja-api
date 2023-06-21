class GetMeetingDetailUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    const { meetingId } = useCasePayload;
    await this._meetingRepository.checkAvailablitiyMeeting(meetingId);
    return this._meetingRepository.getMeetingById(meetingId);
  }
}

module.exports = GetMeetingDetailUseCase;
