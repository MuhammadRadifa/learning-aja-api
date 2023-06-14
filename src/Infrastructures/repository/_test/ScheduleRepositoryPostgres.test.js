const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ScheduleTableTestHelper = require("../../../../tests/ScheduleTableTestHelper");
const AuthenticationError = require("../../../Commons/Exceptions/AuthenticationError");
const InvariantError = require("../../../Commons/Exceptions/invariantError");
const PostedSchedule = require("../../../Domains/schedule/entities/PostedSchedule");
const PostSchedule = require("../../../Domains/schedule/entities/PostSchedule");
const pool = require("../../database/postgres/pool");
const ScheduleRepositoryPostgres = require("../ScheduleRepositoryPostgres");
const ScheduleRepository = require("../../../Domains/schedule/ScheduleRepository");
const NotFoundError = require("../../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../../Commons/Exceptions/AuthorizationError");

describe("ScheduleRepositoryPostgres", () => {
  it("should be instance of ScheduleRepository domain", () => {
    const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres({}, {});

    expect(scheduleRepositoryPostgres).toBeInstanceOf(ScheduleRepository);
  });

  describe("behavior test", () => {
    afterEach(async () => {
      await ScheduleTableTestHelper.cleanTable();
      await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe("addSchedule function", () => {
      it("should persist post schedule and return posted schedule correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        const newSchedule = new PostSchedule({
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });
        const fakeIdGenerator = () => "123";
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          fakeIdGenerator
        );

        const addedSchedule = await scheduleRepositoryPostgres.addSchedule(
          newSchedule
        );

        const schedules = await ScheduleTableTestHelper.findScheduleById(
          "schedule-123"
        );

        expect(schedules).toHaveLength(1);
        expect(addedSchedule).toStrictEqual(
          new PostedSchedule({
            id: "schedule-123",
            title: "title",
            lecturer: "lecturer",
            room: "room",
            classTime: "classTime",
            schedule: "schedule",
            ownerId,
            createdAt: schedules[0].createdAt,
          })
        );
      });
    });

    describe("getScheduleById function", () => {
      it("should throw NotFoundError when schedule not found", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.getScheduleById("schedule-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should return schedule correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        const schedule = await scheduleRepositoryPostgres.getScheduleById(
          "schedule-123"
        );

        expect(schedule).toStrictEqual(
          new PostedSchedule({
            id: "schedule-123",
            title: "title",
            lecturer: "lecturer",
            room: "room",
            classTime: "classTime",
            schedule: "schedule",
            ownerId,
            createdAt: schedule.createdAt,
          })
        );
      });
    });

    describe("verifyScheduleOwner function", () => {
      it("should throw AuthenticationError when schedule not belong to owner", async () => {
        const ownerId = "user-123";
        const anotherOwnerId = "user-456";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.verifyScheduleOwner(
            "schedule-123",
            anotherOwnerId
          )
        ).rejects.toThrowError(AuthorizationError);
      });

      it("should not throw AuthenticationError when schedule belong to owner", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.verifyScheduleOwner(
            "schedule-123",
            ownerId
          )
        ).resolves.not.toThrowError(AuthorizationError);
      });
    });

    describe("deleteScheduleById function", () => {
      it("should throw NotFoundError when schedule not found", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.deleteScheduleById("schedule-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should delete schedule correctly", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        await scheduleRepositoryPostgres.deleteScheduleById("schedule-123");

        const schedules = await ScheduleTableTestHelper.findScheduleById(
          "schedule-123"
        );

        expect(schedules).toHaveLength(0);
      });
    });

    describe("getScheduleDetail function", () => {
      it("should throw NotFoundError when schedule not found", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.getScheduleDetail("schedule-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should return schedule detail correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        const scheduleDetail =
          await scheduleRepositoryPostgres.getScheduleDetail("schedule-123");

        expect(scheduleDetail).toStrictEqual(
          new PostedSchedule({
            id: "schedule-123",
            title: "title",
            lecturer: "lecturer",
            room: "room",
            classTime: "classTime",
            schedule: "schedule",
            ownerId,
            createdAt: scheduleDetail.createdAt,
          })
        );
      });
    });

    describe("editScheduleById function", () => {
      it("should throw NotFoundError when schedule not found", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.editScheduleById("schedule-123", {})
        ).rejects.toThrowError(NotFoundError);
      });

      it("should edit schedule correctly", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        const editedSchedule = {
          id: "schedule-123",
          title: "title edited",
          lecturer: "lecturer edited",
          room: "room edited",
          classTime: "classTime edited",
          schedule: "schedule edited",
          ownerId,
        };

        await scheduleRepositoryPostgres.editScheduleById(editedSchedule);

        const schedules = await ScheduleTableTestHelper.findScheduleById(
          "schedule-123"
        );

        expect(schedules).toHaveLength(1);
        expect(schedules[0]).toStrictEqual({
          id: "schedule-123",
          title: "title edited",
          lecturer: "lecturer edited",
          room: "room edited",
          classTime: "classTime edited",
          schedule: "schedule edited",
          ownerId,
          createdAt: schedules[0].createdAt,
        });
      });
    });

    describe("getUserScheduleList function", () => {
      it("should return schedule list correctly", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        const scheduleList =
          await scheduleRepositoryPostgres.getUserScheduleList(ownerId);

        expect(scheduleList).toStrictEqual([
          new PostedSchedule({
            id: "schedule-123",
            title: "title",
            lecturer: "lecturer",
            room: "room",
            classTime: "classTime",
            schedule: "schedule",
            ownerId,
            createdAt: scheduleList[0].createdAt,
          }),
        ]);
      });
    });

    describe("checkAvailabilitySchedule function", () => {
      it("should throw NotFoundError when schedule not found", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          scheduleRepositoryPostgres.checkAvailabilitySchedule("schedule-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should not throw NotFoundError when schedule found", async () => {
        const scheduleRepositoryPostgres = new ScheduleRepositoryPostgres(
          pool,
          {}
        );

        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await ScheduleTableTestHelper.addSchedule({
          id: "schedule-123",
          title: "title",
          lecturer: "lecturer",
          room: "room",
          classTime: "classTime",
          schedule: "schedule",
          ownerId,
        });

        await expect(
          scheduleRepositoryPostgres.checkAvailabilitySchedule("schedule-123")
        ).resolves.not.toThrowError(NotFoundError);
      });
    });
  });
});
