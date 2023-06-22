class DetailScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { id, ownerId } = useCasePayload;
    await this._scheduleRepository.checkAvailabilitySchedule(id);
    await this._scheduleRepository.verifyScheduleOwner(id, ownerId);
    const schedule = await this._scheduleRepository.getScheduleDetail(id);

    return schedule;
  }

  _validatePayload(payload) {
    const { id, ownerId } = payload;
    if (!id || !ownerId) {
      throw new Error("DETAIL_SCHEDULE_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof id !== "string" || typeof ownerId !== "string") {
      throw new Error(
        "DETAIL_SCHEDULE_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = DetailScheduleUseCase;
