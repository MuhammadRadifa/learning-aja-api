const ScheduleRepository = require("../ScheduleRepository");

describe("ScheduleRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const scheduleRepository = new ScheduleRepository();

    // Action and Assert
    await expect(
      scheduleRepository.addSchedule({
        title: "abc",
        lecturer: "abc",
        room: "abc",
        classTime: "abc",
        ownerId: "abc",
      })
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.getScheduleById("abc")
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.verifyScheduleOwner("abc", "abc")
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.deleteScheduleById("abc")
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.getScheduleDetail("abc")
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.editScheduleById("abc", {
        title: "abc",
        lecturer: "abc",
        room: "abc",
        classTime: "abc",
        ownerId: "abc",
      })
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.getUserScheduleList("abc")
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");

    await expect(
      scheduleRepository.checkAvailabilitySchedule("abc")
    ).rejects.toThrowError("SCHEDULE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
