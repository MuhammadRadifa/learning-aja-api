const FriendRepository = require("../../../Domains/friend/FriendRepository");
const UserRepository = require("../../../Domains/user/UserRepository");
const AcceptFriendUseCase = require("../AcceptFriendUseCase");

describe("AddFriendUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    // Arrange
    const useCasePayload = {};

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();
    const mockUserRepository = new UserRepository();

    /** creating use case instance */
    const acceptFriendUseCase = new AcceptFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action & Assert
    await expect(
      acceptFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError("ACCEPT_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    // Arrange
    const useCasePayload = {
      userId: 123,
      friendId: true,
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();
    const mockUserRepository = new UserRepository();

    /** creating use case instance */
    const acceptFriendUseCase = new AcceptFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action & Assert
    await expect(
      acceptFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "ACCEPT_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the accept friend request action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      friendId: "user-321",
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();
    const mockUserRepository = new UserRepository();

    /** mocking needed function */
    mockUserRepository.verifyAvailableUser = jest.fn(() => Promise.resolve());
    mockFriendRepository.verifyAvailableFriend = jest.fn(() =>
      Promise.resolve()
    );
    mockFriendRepository.verifyAvailableFriendRequest = jest.fn(() =>
      Promise.resolve()
    );
    mockFriendRepository.acceptFriend = jest.fn(() => Promise.resolve());
    mockFriendRepository.removeFriendRequest = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const acceptFriendUseCase = new AcceptFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action
    await acceptFriendUseCase.execute(useCasePayload);

    // Assert
    expect(mockUserRepository.verifyAvailableUser).toBeCalledWith(
      useCasePayload.friendId
    );
    expect(mockFriendRepository.acceptFriend).toBeCalledWith(
      useCasePayload.userId,
      useCasePayload.friendId
    );
  });
});
