const GetFriend = require("../../../Domains/friend/entities/GetFriend");
const PostedFriend = require("../../../Domains/friend/entities/PostedFriend");
const FriendRepository = require("../../../Domains/friend/FriendRepository");
const GetFriendListUseCase = require("../GetFriendListUseCase");

describe("GetFriendListUseCase", () => {
  it("should orchestrating the add friend action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
    };

    const expectedPostedFriend = new PostedFriend({
      friendId: "user-321",
      username: "dicoding",
    });

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** mocking needed function */
    mockFriendRepository.getFriendList = jest.fn(() =>
      Promise.resolve(expectedPostedFriend)
    );

    /** creating use case instance */
    const getFriendListUseCase = new GetFriendListUseCase({
      friendRepository: mockFriendRepository,
    });

    // Action
    const postedFriend = await getFriendListUseCase.execute(useCasePayload);

    // Assert
    expect(postedFriend).toStrictEqual(expectedPostedFriend);
    expect(mockFriendRepository.getFriendList).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
