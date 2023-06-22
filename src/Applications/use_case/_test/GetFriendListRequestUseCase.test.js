const FriendRepository = require("../../../Domains/friend/FriendRepository");
const GetFriendListRequestUseCase = require("../GetFriendListRequestUseCase");

describe("GetFriendListRequestUseCase", () => {
  it("should throw error if use case payload not contain needed property", async () => {
    const useCasePayload = {};

    const mockFriendRepository = new FriendRepository();

    const getFriendListRequestUseCase = new GetFriendListRequestUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      getFriendListRequestUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_FRIEND_LIST_REQUEST_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD"
    );
  });

  it("should throw error if use case payload not meet data type specification", async () => {
    const useCasePayload = {
      userId: 123,
    };

    const mockFriendRepository = new FriendRepository();

    const getFriendListRequestUseCase = new GetFriendListRequestUseCase({
      friendRepository: mockFriendRepository,
    });

    await expect(
      getFriendListRequestUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "GET_FRIEND_LIST_REQUEST_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the get friend list request action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
    };

    /** creating dependency of use case */
    const mockFriendRepository = new FriendRepository();

    /** creating use case instance */
    const getFriendListRequestUseCase = new GetFriendListRequestUseCase({
      friendRepository: mockFriendRepository,
    });

    // Mocking
    mockFriendRepository.getFriendRequestList = jest.fn(() =>
      Promise.resolve()
    );

    // Action
    await getFriendListRequestUseCase.execute(useCasePayload);

    // Assert
    expect(mockFriendRepository.getFriendRequestList).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
