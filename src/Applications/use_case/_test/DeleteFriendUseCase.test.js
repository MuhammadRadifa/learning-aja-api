const FriendRepository = require("../../../Domains/friend/FriendRepository");
const UserRepository = require("../../../Domains/user/UserRepository");
const DeleteFriendUseCase = require("../DeleteFriendUseCase");

describe("DeleteFriendUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    // Arrange
    const useCasePayload = {};

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();
    const mockUserRepository = new UserRepository();

    /** creating use case instance */
    const deleteFriendUseCase = new DeleteFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action & Assert
    await expect(
      deleteFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError("DELETE_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD");
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
    const deleteFriendUseCase = new DeleteFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action & Assert
    await expect(
      deleteFriendUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "DELETE_FRIEND_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("orchestrating the delete friend action correctly", async () => {
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
    mockFriendRepository.checkFriendship = jest.fn(() => Promise.resolve());
    mockFriendRepository.deleteFriend = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const deleteFriendUseCase = new DeleteFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action
    await deleteFriendUseCase.execute(useCasePayload);

    // Assert
    expect(mockFriendRepository.checkFriendship).toBeCalledWith(
      useCasePayload.userId,
      useCasePayload.friendId
    );
    expect(mockFriendRepository.deleteFriend).toBeCalledWith(
      useCasePayload.userId,
      useCasePayload.friendId
    );
  });
});
