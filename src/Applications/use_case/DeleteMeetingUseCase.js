class DeleteMeetingUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    const { meetingId, ownerId } = useCasePayload;
    await this._meetingRepository.checkAvailablitiyMeeting(meetingId);
    await this._meetingRepository.verifyMeetingOwner(meetingId, ownerId);
    await this._meetingRepository.deleteMeeting(meetingId);
  }
}

module.exports = DeleteMeetingUseCase;
