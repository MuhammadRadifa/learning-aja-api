const PostMeeting = require("../../Domains/meeting/entities/PostMeeting");

class AddMeetingUseCase {
  constructor({ meetingRepository }) {
    this._meetingRepository = meetingRepository;
  }

  async execute(useCasePayload) {
    const postMeeting = new PostMeeting(useCasePayload);

    const meeting = await this._meetingRepository.addMeeting(postMeeting);
    await this._meetingRepository.addParticipantToMeeting(
      meeting.id,
      postMeeting.ownerId
    );

    return meeting;
  }
}

module.exports = AddMeetingUseCase;
