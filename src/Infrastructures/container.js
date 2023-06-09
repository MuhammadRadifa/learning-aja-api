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

const JwtTokenManager = require("./security/JwtTokenManager");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");
const JoiInputValidator = require("./security/JoiInputValidator");

// use case
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const AddUserUseCase = require("../Applications/use_case/AddUserUseCase");
const PasswordHash = require("../Applications/security/PasswordHash");
const InputValidator = require("../Applications/security/InputValidator");
const LoginUserUseCase = require("../Applications/use_case/LoginUserUseCase");
const LogoutUserUseCase = require("../Applications/use_case/LogoutUserUseCase");
const RefreshAuthenticationUseCase = require("../Applications/use_case/RefreshAuthenticationUseCase");
const AddTodoUseCase = require("../Applications/use_case/AddTodoUseCase");
const DetailTodoUseCase = require("../Applications/use_case/DetailTodoUseCase");
const DeleteTodoUseCase = require("../Applications/use_case/DeleteTodoUseCase");

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
]);

module.exports = container;
