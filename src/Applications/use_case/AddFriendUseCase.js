const PostFriend = require("../../Domains/friend/entities/PostFriend");

class AddFriendUseCase {
  constructor({ friendRepository, userRepository }) {
    this._friendRepository = friendRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const { userId, friendId } = new PostFriend(useCasePayload);
    await this._userRepository.verifyAvailableUser(friendId);
    await this._friendRepository.verifyIsYourSelf(userId, friendId);
    await this._friendRepository.verifyFriendRequest(userId, friendId);
    return this._friendRepository.addFriend(userId, friendId);
  }
}

module.exports = AddFriendUseCase;
