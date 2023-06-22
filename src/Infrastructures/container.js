/* istanbul ignore file */
const { createContainer } = require("instances-container");

// external agency
const { nanoid } = require("nanoid");
const Jwt = require("@hapi/jwt");
const bcrypt = require("bcrypt");
const joi = require("joi");
const pool = require("./database/postgres/pool");

// service (repository, helper, manager, etc)
const UserRepository = require("../Domains/user/UserRepository");
const UserRepositoryPostgres = require("./repository/UserRepositoryPostgres");

const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationRepositoryPostgres = require("./repository/AuthenticationRepositoryPostgres");

const TodoRepository = require("../Domains/todolist/TodoRepository");
const TodoRepositoryPostgres = require("./repository/TodoRepositoryPostgres");

const ScheduleRepository = require("../Domains/schedule/ScheduleRepository");
const ScheduleRepositoryPostgres = require("./repository/ScheduleRepositoryPostgres");

const FriendRepository = require("../Domains/friend/FriendRepository");
const FriendRepositoryPostgres = require("./repository/FriendRepositoryPostgres");

const MeetingRepository = require("../Domains/meeting/MeetingRepository");
const MeetingRepositoryPostgres = require("./repository/MeetingRepositoryPostgres");

const JwtTokenManager = require("./security/JwtTokenManager");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");
const JoiInputValidator = require("./security/JoiInputValidator");

// use case
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");

const AddUserUseCase = require("../Applications/use_case/AddUserUseCase");
const GetUserListUseCase = require("../Applications/use_case/GetUserListUseCase");
const GetOwnUserProfileUseCase = require("../Applications/use_case/GetOwnUserProfileUseCase");

const PasswordHash = require("../Applications/security/PasswordHash");
const InputValidator = require("../Applications/security/InputValidator");
const LoginUserUseCase = require("../Applications/use_case/LoginUserUseCase");
const LogoutUserUseCase = require("../Applications/use_case/LogoutUserUseCase");
const RefreshAuthenticationUseCase = require("../Applications/use_case/RefreshAuthenticationUseCase");

// Todo Use Case
const AddTodoUseCase = require("../Applications/use_case/AddTodoUseCase");
const DetailTodoUseCase = require("../Applications/use_case/DetailTodoUseCase");
const DeleteTodoUseCase = require("../Applications/use_case/DeleteTodoUseCase");
const EditTodoUseCase = require("../Applications/use_case/EditTodoUseCase");
const GetUserTodosUseCase = require("../Applications/use_case/GetUserTodosUseCase");

// Schedule Use Case
const AddScheduleUseCase = require("../Applications/use_case/AddScheduleUseCase");
const DetailScheduleUseCase = require("../Applications/use_case/DetailScheduleUseCase");
const DeleteScheduleUseCase = require("../Applications/use_case/DeleteScheduleUseCase");
const EditScheduleUseCase = require("../Applications/use_case/EditScheduleUseCase");
const GetUserScheduleUseCase = require("../Applications/use_case/GetUserScheduleUseCase");

// Friend Use Case
const AcceptFriendUseCase = require("../Applications/use_case/AcceptFriendUseCase");
const AddFriendUseCase = require("../Applications/use_case/AddFriendUseCase");
const BlockFriendUseCase = require("../Applications/use_case/BlockFriendUseCase");
const DeleteFriendUseCase = require("../Applications/use_case/DeleteFriendUseCase");
const GetFriendBlockedListUseCase = require("../Applications/use_case/GetFriendBlockedListUseCase");
const GetFriendListUseCase = require("../Applications/use_case/GetFriendListUseCase");
const GetFriendListRequestUseCase = require("../Applications/use_case/GetFriendListRequestUseCase");
const RejectFriendUseCase = require("../Applications/use_case/RejectFriendUseCase");
const UnBlockFriendUseCase = require("../Applications/use_case/UnBlockFriendUseCase");

// Meeting Use Case
const AddMeetingUseCase = require("../Applications/use_case/AddMeetingUseCase");
const GetMeetingDetailUseCase = require("../Applications/use_case/GetMeetingDetailUseCase");
const GetMeetingUseCase = require("../Applications/use_case/GetMeetingUseCase");
const GetUserMeetingUseCase = require("../Applications/use_case/GetUserMeetingUseCase");
const DeleteMeetingUseCase = require("../Applications/use_case/DeleteMeetingUseCase");

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: InputValidator.name,
    Class: JoiInputValidator,
    parameter: {
      dependencies: [
        {
          concrete: joi,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
  {
    key: TodoRepository.name,
    Class: TodoRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: ScheduleRepository.name,
    Class: ScheduleRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: FriendRepository.name,
    Class: FriendRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: MeetingRepository.name,
    Class: MeetingRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
        {
          name: "inputValidator",
          internal: InputValidator.name,
        },
      ],
    },
  },
  {
    key: GetUserListUseCase.name,
    Class: GetUserListUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: GetOwnUserProfileUseCase.name,
    Class: GetOwnUserProfileUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: AddTodoUseCase.name,
    Class: AddTodoUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "todoRepository",
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: DetailTodoUseCase.name,
    Class: DetailTodoUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "todoRepository",
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteTodoUseCase.name,
    Class: DeleteTodoUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "todoRepository",
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: EditTodoUseCase.name,
    Class: EditTodoUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "todoRepository",
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserTodosUseCase.name,
    Class: GetUserTodosUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "todoRepository",
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: AddScheduleUseCase.name,
    Class: AddScheduleUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "scheduleRepository",
          internal: ScheduleRepository.name,
        },
      ],
    },
  },
  {
    key: DetailScheduleUseCase.name,
    Class: DetailScheduleUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "scheduleRepository",
          internal: ScheduleRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteScheduleUseCase.name,
    Class: DeleteScheduleUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "scheduleRepository",
          internal: ScheduleRepository.name,
        },
      ],
    },
  },
  {
    key: EditScheduleUseCase.name,
    Class: EditScheduleUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "scheduleRepository",
          internal: ScheduleRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserScheduleUseCase.name,
    Class: GetUserScheduleUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "scheduleRepository",
          internal: ScheduleRepository.name,
        },
      ],
    },
  },
  {
    key: AcceptFriendUseCase.name,
    Class: AcceptFriendUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: AddFriendUseCase.name,
    Class: AddFriendUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: BlockFriendUseCase.name,
    Class: BlockFriendUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteFriendUseCase.name,
    Class: DeleteFriendUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: GetFriendBlockedListUseCase.name,
    Class: GetFriendBlockedListUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
      ],
    },
  },
  {
    key: GetFriendListRequestUseCase.name,
    Class: GetFriendListRequestUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
      ],
    },
  },
  {
    key: GetFriendListUseCase.name,
    Class: GetFriendListUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
      ],
    },
  },
  {
    key: RejectFriendUseCase.name,
    Class: RejectFriendUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
      ],
    },
  },
  {
    key: UnBlockFriendUseCase.name,
    Class: UnBlockFriendUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "friendRepository",
          internal: FriendRepository.name,
        },
      ],
    },
  },
  {
    key: AddMeetingUseCase.name,
    Class: AddMeetingUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "meetingRepository",
          internal: MeetingRepository.name,
        },
      ],
    },
  },
  {
    key: GetMeetingDetailUseCase.name,
    Class: GetMeetingDetailUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "meetingRepository",
          internal: MeetingRepository.name,
        },
      ],
    },
  },
  {
    key: GetMeetingUseCase.name,
    Class: GetMeetingUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "meetingRepository",
          internal: MeetingRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserMeetingUseCase.name,
    Class: GetUserMeetingUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "meetingRepository",
          internal: MeetingRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteMeetingUseCase.name,
    Class: DeleteMeetingUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "meetingRepository",
          internal: MeetingRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
