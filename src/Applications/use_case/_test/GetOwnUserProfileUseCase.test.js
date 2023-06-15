const GetUser = require("../../../Domains/user/entities/GetUser");
const UserRepository = require("../../../Domains/user/UserRepository");
const GetOwnUserProfileUseCase = require("../GetOwnUserProfileUseCase");

describe("GetOwnUserProfileUseCase", () => {
  it("should orchestrating the get user list action correctly", async () => {
    const useCasePayload = {
      id: "user-123",
      username: "dicoding",
      fullname: "Dicoding Indonesia",
    };

    const expectedUser = [
      new GetUser({
        id: "user-123",
        username: "dicoding",
        fullname: "Dicoding Indonesia",
      }),
    ];

    const mockUserRepository = new UserRepository();

    mockUserRepository.getOwnUserProfile = jest.fn(() =>
      Promise.resolve(expectedUser)
    );

    const getOwnUserProfileUseCase = new GetOwnUserProfileUseCase({
      userRepository: mockUserRepository,
    });

    const user = await getOwnUserProfileUseCase.execute(useCasePayload);

    expect(user).toStrictEqual(expectedUser);
    expect(mockUserRepository.getOwnUserProfile).toBeCalledWith(useCasePayload);
  });
});
