const GetFriend = require("../../Domains/friend/entities/GetFriend");

class GetFriendListUseCase {
  constructor({ friendRepository }) {
    this._friendRepository = friendRepository;
  }

  async execute(useCasePayload) {
    const { userId } = new GetFriend(useCasePayload);
    return this._friendRepository.getFriendList(userId);
  }
}

module.exports = GetFriendListUseCase;
