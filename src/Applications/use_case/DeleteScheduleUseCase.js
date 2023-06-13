class DeleteScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    await this._scheduleRepository.checkAvailabilitySchedule(
      useCasePayload.scheduleId
    );
    await this._scheduleRepository.verifyScheduleOwner(
      useCasePayload.scheduleId,
      useCasePayload.ownerId
    );
    await this._scheduleRepository.deleteScheduleById(
      useCasePayload.scheduleId
    );
  }
}

module.exports = DeleteScheduleUseCase;
