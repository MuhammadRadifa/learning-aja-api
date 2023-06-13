class GetUserScheduleUseCase {
  constructor({ scheduleRepository }) {
    this._scheduleRepository = scheduleRepository;
  }

  async execute(useCasePayload) {
    const userScheduleList = await this._scheduleRepository.getUserScheduleList(
      useCasePayload.userId
    );
    return userScheduleList;
  }
}

module.exports = GetUserScheduleUseCase;
