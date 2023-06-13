class DetailScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    const { id, ownerId } = useCasePayload;
    await this._scheduleRepository.checkAvailabilitySchedule(id);
    await this._scheduleRepository.verifyScheduleOwner(id, ownerId);
    const schedule = await this._scheduleRepository.getScheduleDetail(id);

    return schedule;
  }
}

module.exports = DetailScheduleUseCase;
