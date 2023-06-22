const FriendRepository = require("../../../Domains/friend/FriendRepository");
const UnBlockFriendUseCase = require("../UnBlockFriendUseCase");

describe("UnBlockFriendUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const mockFriendRepository = new FriendRepository();

    const unBlockFriendUseCase = new UnBlockFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      unBlockFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "UNBLOCK_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      userId: 123,
      blockId: true,
    };

    const mockFriendRepository = new FriendRepository();

    const unBlockFriendUseCase = new UnBlockFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      unBlockFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "UNBLOCK_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the unblock friend action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      blockId: "user-321",
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const unBlockFriendUseCase = new UnBlockFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    // Mocking
    mockFriendRepository.verifyUserUnblocking = jest.fn(() =>
      Promise.resolve()
    );
    mockFriendRepository.checkBlockFriend = jest.fn(() => Promise.resolve());
    mockFriendRepository.unBlockFriend = jest.fn(() => Promise.resolve());

    // Action
    await unBlockFriendUseCase.execute(useCasePayload);

    // Assert
    expect(mockFriendRepository.checkBlockFriend).toBeCalledWith(
      useCasePayload.userId,
      useCasePayload.blockId
    );
  });
});
