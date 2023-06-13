const PostedSchedule = require("../../Domains/schedule/entities/PostedSchedule");

class EditScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    const { id, title, lecturer, room, classTime, schedule, ownerId } =
      new PostedSchedule(useCasePayload);
    await this._scheduleRepository.checkAvailabilitySchedule(useCasePayload.id);
    await this._scheduleRepository.verifyScheduleOwner(
      useCasePayload.id,
      useCasePayload.ownerId
    );
    await this._scheduleRepository.editScheduleById({
      id,
      title,
      lecturer,
      room,
      classTime,
      schedule,
      ownerId,
    });
  }
}

module.exports = EditScheduleUseCase;
