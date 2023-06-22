const PostedFriend = require("../../../Domains/friend/entities/PostedFriend");
const FriendRepository = require("../../../Domains/friend/FriendRepository");
const UserRepository = require("../../../Domains/user/UserRepository");
const AddFriendUseCase = require("../AddFriendUseCase");

describe("AddFriendUseCase", () => {
  it("should orchestrating the add friend action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      friendId: "user-321",
    };

    const expectedPostedFriend = new PostedFriend({
      friendId: useCasePayload.friendId,
      username: "dicoding",
    });

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();
    const mockUserRepository = new UserRepository();

    /** mocking needed function */
    mockUserRepository.verifyAvailableUser = jest.fn(() => Promise.resolve());
    mockFriendRepository.verifyFriendRequest = jest.fn(() => Promise.resolve());
    mockFriendRepository.addFriend = jest.fn(() =>
      Promise.resolve(expectedPostedFriend)
    );

    /** creating use case instance */
    const addFriendUseCase = new AddFriendUseCase({
      friendRepository: mockFriendRepository,
      userRepository: mockUserRepository,
    });

    // Action
    const postedFriend = await addFriendUseCase.execute(useCasePayload);

    // Assert
    expect(postedFriend).toStrictEqual(expectedPostedFriend);
    expect(mockUserRepository.verifyAvailableUser).toBeCalledWith(
      useCasePayload.friendId
    );
    expect(mockFriendRepository.addFriend).toBeCalledWith(
      useCasePayload.userId,
      useCasePayload.friendId
    );
  });
});
