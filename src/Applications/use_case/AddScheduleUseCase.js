const PostSchedule = require("../../Domains/schedule/entities/PostSchedule");

class AddScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    const postSchedule = new PostSchedule(useCasePayload);
    return this._scheduleRepository.addSchedule({
      title: postSchedule.title,
      lecturer: postSchedule.lecturer,
      room: postSchedule.room,
      classTime: postSchedule.classTime,
      schedule: postSchedule.schedule,
      ownerId: postSchedule.ownerId,
    });
  }
}

module.exports = AddScheduleUseCase;
