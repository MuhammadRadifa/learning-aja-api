const FriendRepository = require("../FriendRepository");

describe("FriendRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const friendRepository = new FriendRepository();

    // Action and Assert
    await expect(friendRepository.addFriend("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.acceptFriend("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.rejectFriend("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.blockFriend("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      friendRepository.getFriendRequestList("")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(friendRepository.getFriendList("")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.getBlockList("")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.unBlockFriend("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.deleteFriend("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(friendRepository.checkFriendship("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      friendRepository.checkBlockFriend("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      friendRepository.verifyAvailableFriend("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      friendRepository.verifyFriendRequest("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      friendRepository.verifyAvailableFriendRequest("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      friendRepository.removeFriendRequest("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      friendRepository.verifyUserUnblocking("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(friendRepository.verifyBlockUser("", "")).rejects.toThrowError(
      "FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      friendRepository.verifyIsYourSelf("", "")
    ).rejects.toThrowError("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
