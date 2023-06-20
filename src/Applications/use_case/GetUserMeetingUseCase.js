class GetUserMeetingUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    const { userId } = useCasePayload;
    return this._meetingRepository.getMeetingByUserId(userId);
  }
}

module.exports = GetUserMeetingUseCase;
