const FriendRepository = require("../../../Domains/friend/FriendRepository");
const BlockFriendUseCase = require("../BlockFriendUseCase");

describe("BlockFriendUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const mockFriendRepository = new FriendRepository();

    const blockFriendUseCase = new BlockFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      blockFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError("BLOCK_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      userId: 123,
      blockId: true,
    };

    const mockFriendRepository = new FriendRepository();

    const blockFriendUseCase = new BlockFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      blockFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "BLOCK_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the block friend action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      blockId: "user-321",
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const blockFriendUseCase = new BlockFriendUseCase({
      friendRepository: mockFriendRepository,
    });

    // Mocking
    mockFriendRepository.verifyIsYourSelf = jest.fn(() => Promise.resolve());
    mockFriendRepository.verifyBlockUser = jest.fn(() => Promise.resolve());
    mockFriendRepository.blockFriend = jest.fn(() => Promise.resolve());

    // Action
    await blockFriendUseCase.execute(useCasePayload);

    // Assert
    expect(mockFriendRepository.blockFriend).toBeCalledWith(
      useCasePayload.userId,
      useCasePayload.blockId
    );
  });
});
