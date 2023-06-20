class GetMeetingDetailUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    await this._meetingRepository.checkAvailablitiyMeeting(id);
    return this._meetingRepository.getMeetingById(id);
  }
}

module.exports = GetMeetingDetailUseCase;
