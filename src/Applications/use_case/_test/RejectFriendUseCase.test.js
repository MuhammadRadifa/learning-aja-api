const FriendRepository = require("../../../Domains/friend/FriendRepository");
const RejectFriendUseCase = require("../RejectFriendUseCase");

describe("RejectFriendUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const mockFriendRepository = new FriendRepository();

    const rejectFriendUseCase = new RejectFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      rejectFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError("REJECT_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      senderId: 123,
      receiverId: true,
    };

    const mockFriendRepository = new FriendRepository();

    const rejectFriendUseCase = new RejectFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      rejectFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "REJECT_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the reject friend action correctly", async () => {
    // Arrange
    const useCasePayload = {
      senderId: "user-123",
      receiverId: "user-321",
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const rejectFriendUseCase = new RejectFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    // Mocking
    mockFriendRepository.rejectFriend = jest.fn(() => Promise.resolve());

    // Action
    await rejectFriendUseCase.execute(useCasePayload);

    // Assert
    expect(mockFriendRepository.rejectFriend).toBeCalledWith(
      useCasePayload.senderId,
      useCasePayload.receiverId
    );
  });
});
