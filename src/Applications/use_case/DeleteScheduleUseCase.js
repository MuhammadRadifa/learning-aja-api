class DeleteScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { scheduleId, ownerId } = useCasePayload;
    await this._scheduleRepository.checkAvailabilitySchedule(scheduleId);
    await this._scheduleRepository.verifyScheduleOwner(scheduleId, ownerId);
    await this._scheduleRepository.deleteScheduleById(scheduleId);
  }

  _validatePayload(payload) {
    const { scheduleId, ownerId } = payload;
    if (!scheduleId || !ownerId) {
      throw new Error("DELETE_SCHEDULE_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
    }

    if (typeof scheduleId !== "string" || typeof ownerId !== "string") {
      throw new Error(
        "DELETE_SCHEDULE_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = DeleteScheduleUseCase;
