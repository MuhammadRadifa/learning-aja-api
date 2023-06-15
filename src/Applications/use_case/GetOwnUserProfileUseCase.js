class GetOwnUserProfileUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const userProfile = await this._userRepository.getOwnUserProfile(
      useCasePayload
    );
    return userProfile;
  }
}

module.exports = GetOwnUserProfileUseCase;
