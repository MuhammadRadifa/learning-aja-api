class FriendRepository {
  async addFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async acceptFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async rejectFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async blockFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getFriendRequestList(userId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getFriendList(userId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getBlockList(userId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async unBlockFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkFriendship(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async checkBlockFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAvailableFriend(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyFriendRequest(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAvailableFriendRequest(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyUserUnblocking(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyBlockUser(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyIsYourSelf(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async removeFriendRequest(userId, friendId) {
    throw new Error("FRIEND_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = FriendRepository;
