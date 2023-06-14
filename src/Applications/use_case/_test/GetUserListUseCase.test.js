const GetUser = require("../../../Domains/user/entities/GetUser");
const UserRepository = require("../../../Domains/user/UserRepository");
const GetUserListUseCase = require("../GetUserListUseCase");

describe("GetUserListUseCase", () => {
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

    mockUserRepository.getUserList = jest.fn(() =>
      Promise.resolve(expectedUser)
    );

    const getUserListUseCase = new GetUserListUseCase({
      userRepository: mockUserRepository,
    });

    const user = await getUserListUseCase.execute(useCasePayload);

    expect(user).toStrictEqual(expectedUser);
    expect(mockUserRepository.getUserList).toBeCalledWith(useCasePayload);
  });
});
