class ScheduleRepository {
  async addSchedule() {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getScheduleById(id) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyScheduleOwner(id, ownerId) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteScheduleById(id) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getScheduleDetail(id) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async editScheduleById({ id, title, lecturer, room, classTime, ownerId }) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserScheduleList(userId) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkAvailabilitySchedule(id) {
    throw new Error("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = ScheduleRepository;
