const MeetingRepository = require("../../../Domains/meeting/MeetingRepository");
const MeetingRepositoryPostgres = require("../MeetingRepositoryPostgres");
const MeetingTableTestHelper = require("../../../../tests/MeetingTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const pool = require("../../database/postgres/pool");
const PostMeeting = require("../../../Domains/meeting/entities/PostMeeting");
const PostedMeeting = require("../../../Domains/meeting/entities/PostedMeeting");
const NotFoundError = require("../../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../../Commons/Exceptions/AuthorizationError");

describe("MeetingRepositoryPostgres", () => {
  it("should be instance of MeetingRepository domain", () => {
    const meetingRepositoryPostgres = new MeetingRepositoryPostgres({}, {});

    expect(meetingRepositoryPostgres).toBeInstanceOf(MeetingRepository);
  });

  describe("behavior test", () => {
    afterEach(async () => {
      await MeetingTableTestHelper.cleanTable();
      await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe("addMeeting function", () => {
      it("should persist add meeting and return added meeting correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        const newMeeting = new PostMeeting({
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId,
        });
        const fakeIdGenerator = () => "123";
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          fakeIdGenerator
        );

        const addedMeeting = await meetingRepositoryPostgres.addMeeting(
          newMeeting
        );

        const meetings = await MeetingTableTestHelper.findMeetingById(
          "meeting-123"
        );

        expect(meetings).toHaveLength(1);
        expect(addedMeeting).toStrictEqual(
          new PostedMeeting({
            id: "meeting-123",
            title: "title",
            description: "body",
            date: "2021-08-08",
            time: "12:00",
            location: "location",
            ownerId,
            createdAt: meetings[0].createdAt,
          })
        );
      });
    });

    describe("getMeetingById function", () => {
      it("should throw NotFoundError when meeting not found", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          meetingRepositoryPostgres.getMeetingById("meeting-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should return meeting correctly", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };
        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };
        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        const meeting = await meetingRepositoryPostgres.getMeetingById(
          "meeting-123"
        );

        expect(meeting).toStrictEqual(
          new PostedMeeting({
            id: "meeting-123",
            title: "title",
            description: "body",
            date: "2021-08-08",
            time: "12:00",
            location: "location",
            ownerId: userPayload.id,
            createdAt: "2021-08-08T07:22:33.555Z",
          })
        );
      });
    });

    describe("getMeetingByUserId function", () => {
      it("should return meeting correctly", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };

        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await meetingRepositoryPostgres.addParticipantToMeeting(
          "meeting-123",
          userPayload.id
        );

        const meetings = await meetingRepositoryPostgres.getMeetingByUserId(
          userPayload.id
        );

        expect(meetings).toHaveLength(1);
      });
    });

    describe("checkAvailablitiyMeeting function", () => {
      it("should throw NotFoundError when meeting not found", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          meetingRepositoryPostgres.checkAvailablitiyMeeting("meeting-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("not throw error when meeting is available", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };

        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await expect(
          meetingRepositoryPostgres.checkAvailablitiyMeeting("meeting-123")
        ).resolves.not.toThrowError(NotFoundError);
      });
    });

    describe("verifyMeetingOwner function", () => {
      it("should throw AuthorizationError when meeting not match", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };
        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await expect(
          meetingRepositoryPostgres.verifyMeetingOwner(
            "meeting-123",
            "user-321"
          )
        ).rejects.toThrowError(AuthorizationError);
      });

      it("should not throw error when meeting match", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };

        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await expect(
          meetingRepositoryPostgres.verifyMeetingOwner(
            "meeting-123",
            "user-123"
          )
        ).resolves.not.toThrowError(AuthorizationError);
      });
    });

    describe("addParticipantToMeeting function", () => {
      it("should not throw error when meeting match", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };
        const userPayload2 = {
          id: "user-321",
          username: "userRandom",
        };

        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await UsersTableTestHelper.addUser(userPayload2);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await meetingRepositoryPostgres.verifyMeetingOwner(
          "meeting-123",
          "user-123"
        );

        await expect(
          meetingRepositoryPostgres.addParticipantToMeeting(
            "meeting-123",
            "user-321"
          )
        ).resolves.not.toThrowError(AuthorizationError);
      });
    });

    describe("verifyMeetingParticipantByMeetingId function", () => {
      it("should throw AuthorizationError when meeting not match", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };
        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await expect(
          meetingRepositoryPostgres.verifyMeetingParticipantByMeetingId(
            "meeting-123",
            "user-321"
          )
        ).rejects.toThrowError(AuthorizationError);
      });

      it("should not throw error when meeting match", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };

        const userPayload2 = {
          id: "user-321",
          username: "userRandom",
        };

        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await UsersTableTestHelper.addUser(userPayload2);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await meetingRepositoryPostgres.verifyMeetingOwner(
          "meeting-123",
          "user-123"
        );

        await meetingRepositoryPostgres.addParticipantToMeeting(
          "meeting-123",
          "user-321"
        );

        await expect(
          meetingRepositoryPostgres.verifyMeetingParticipantByMeetingId(
            "meeting-123",
            "user-321"
          )
        ).resolves.not.toThrowError(AuthorizationError);
      });
    });

    describe("deleteMeeting function", () => {
      it("should throw NotFoundError when meeting not found", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        await expect(
          meetingRepositoryPostgres.deleteMeeting("meeting-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should not throw error when meeting deleted", async () => {
        const meetingRepositoryPostgres = new MeetingRepositoryPostgres(
          pool,
          {}
        );

        const userPayload = {
          id: "user-123",
          username: "dicoding",
        };

        const meetingPayload = {
          id: "meeting-123",
          title: "title",
          description: "body",
          date: "2021-08-08",
          time: "12:00",
          location: "location",
          ownerId: userPayload.id,
          createdAt: "2021-08-08T07:22:33.555Z",
        };

        await UsersTableTestHelper.addUser(userPayload);
        await MeetingTableTestHelper.addMeeting(meetingPayload);

        await expect(
          meetingRepositoryPostgres.deleteMeeting("meeting-123")
        ).resolves.not.toThrowError(NotFoundError);
      });
    });
  });
});
