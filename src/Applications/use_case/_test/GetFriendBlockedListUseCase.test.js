const FriendRepository = require("../../../Domains/friend/FriendRepository");
const GetFriendBlockedListUseCase = require("../GetFriendBlockedListUseCase");

describe("GetFriendBlockedListUseCase use case", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    // Arrange
    const useCasePayload = {};

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const getFriendBlockedListUseCase = new GetFriendBlockedListUseCase({
      friendRepository: mockFriendRepository,
    });

    // Action & Assert
    await expect(
      getFriendBlockedListUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_FRIEND_BLOCKED_LIST.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    // Arrange
    const useCasePayload = {
      userId: 123,
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const getFriendBlockedListUseCase = new GetFriendBlockedListUseCase({
      friendRepository: mockFriendRepository,
    });

    // Action & Assert
    await expect(
      getFriendBlockedListUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_FRIEND_BLOCKED_LIST.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the get friend blocked list action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const getFriendBlockedListUseCase = new GetFriendBlockedListUseCase({
      friendRepository: mockFriendRepository,
    });

    // Mocking
    mockFriendRepository.getBlockList = jest.fn(() => Promise.resolve());

    // Action
    await getFriendBlockedListUseCase.execute(useCasePayload);

    // Assert
    expect(mockFriendRepository.getBlockList).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
