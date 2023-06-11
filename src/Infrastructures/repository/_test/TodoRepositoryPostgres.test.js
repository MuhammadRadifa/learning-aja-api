const TodoRepositoryPostgres = require("../TodoRepositoryPostgres");
const TodoRepository = require("../../../Domains/todolist/TodoRepository");
const TodoTableTestHelper = require("../../../../tests/TodoTableTestHelper");
const pool = require("../../database/postgres/pool");
const PostTodo = require("../../../Domains/todolist/entities/PostTodo");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const PostedTodo = require("../../../Domains/todolist/entities/PostedTodo");
const NotFoundError = require("../../../Commons/Exceptions/NotFoundError");
const AuthorizationError = require("../../../Commons/Exceptions/AuthorizationError");

describe("TodoRepositoryPostgres", () => {
  it("should be instance of TodoRepository domain", () => {
    const todoRepositoryPostgres = new TodoRepositoryPostgres({}, {});

    expect(todoRepositoryPostgres).toBeInstanceOf(TodoRepository);
  });

  describe("behavior test", () => {
    afterEach(async () => {
      await TodoTableTestHelper.cleanTable();
      await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe("addTodo function", () => {
      it("should persist add todo and return added todo correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        const newTodo = new PostTodo({
          title: "title",
          content: "body",
          ownerId,
        });
        const fakeIdGenerator = () => "123";
        const todoRepositoryPostgres = new TodoRepositoryPostgres(
          pool,
          fakeIdGenerator
        );

        const addedTodo = await todoRepositoryPostgres.addTodo(newTodo);

        const todos = await TodoTableTestHelper.findNotesById("todo-123");
        expect(todos).toHaveLength(1);
        expect(addedTodo).toStrictEqual(
          new PostedTodo({
            id: "todo-123",
            title: "title",
            content: "body",
            ownerId,
          })
        );
      });
    });

    describe("getTodoById function", () => {
      it("should throw NotFoundError when todo not found", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        await expect(
          todoRepositoryPostgres.getTodoById("todo-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should return todo correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        const todo = await todoRepositoryPostgres.getTodoById("todo-123");

        expect(todo).toStrictEqual(
          new PostedTodo({
            id: "todo-123",
            title: "title",
            content: "body",
            status: todo.status,
            createdAt: todo.createdAt,
            ownerId,
          })
        );
      });
    });

    describe("verifyTodoOwner function", () => {
      it("should throw AuthorizationError when todo not owned by owner", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });

        await expect(
          todoRepositoryPostgres.verifyTodoOwner("todo-123", "user-456")
        ).rejects.toThrowError(AuthorizationError);
      });

      it("should not throw AuthorizationError when todo owned by owner", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });

        await expect(
          todoRepositoryPostgres.verifyTodoOwner("todo-123", "user-123")
        ).resolves.not.toThrowError(AuthorizationError);
      });
    });

    describe("deleteTodoById function", () => {
      it("should throw NotFoundError when todo not found", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        await expect(
          todoRepositoryPostgres.deleteTodoById("todo-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should delete todo correctly", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });

        await todoRepositoryPostgres.deleteTodoById("todo-123");

        const todos = await TodoTableTestHelper.findNotesById("todo-123");

        expect(todos).toHaveLength(0);
      });
    });

    describe("getTodoDetail function", () => {
      it("should throw NotFoundError when todo not found", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        await expect(
          todoRepositoryPostgres.getTodoDetail("todo-123")
        ).rejects.toThrowError(NotFoundError);
      });

      it("should return todo correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        const todo = await todoRepositoryPostgres.getTodoDetail("todo-123");

        expect(todo).toStrictEqual(
          new PostedTodo({
            id: "todo-123",
            title: "title",
            content: "body",
            ownerId,
          })
        );
      });
    });

    describe("editTodoById function", () => {
      it("should throw NotFoundError when todo not found", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        await expect(
          todoRepositoryPostgres.editTodoById("todo-123", {})
        ).rejects.toThrowError(NotFoundError);
      });

      it("should edit todo correctly", async () => {
        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });

        await todoRepositoryPostgres.editTodoById({
          todoId: "todo-123",
          title: "title edit",
          content: "body edit",
          status: "completed",
        });

        const todos = await TodoTableTestHelper.findNotesById("todo-123");

        expect(todos).toHaveLength(1);
        expect(todos[0]).toStrictEqual({
          id: "todo-123",
          title: "title edit",
          content: "body edit",
          status: "completed",
          createdAt: todos[0].createdAt,
          ownerId,
        });
      });
    });

    describe("getTodos function", () => {
      it("should return todos correctly", async () => {
        const ownerId = "user-123";
        await UsersTableTestHelper.addUser({ id: ownerId });
        await TodoTableTestHelper.addNotes({
          id: "todo-123",
          title: "title",
          content: "body",
          ownerId,
        });

        await TodoTableTestHelper.addNotes({
          id: "todo-456",
          title: "title",
          content: "body",
          ownerId,
        });

        const todoRepositoryPostgres = new TodoRepositoryPostgres(pool, {});

        const todos = await todoRepositoryPostgres.getUserTodoList(ownerId);

        const expectedTodos = [
          {
            id: "todo-123",
            title: "title",
            content: "body",
            status: todos[0].status,
            createdAt: todos[0].createdAt,
            ownerId,
          },
          {
            id: "todo-456",
            title: "title",
            content: "body",
            status: todos[1].status,
            createdAt: todos[1].createdAt,
            ownerId,
          },
        ];

        expect(todos).toStrictEqual(expectedTodos);
      });
    });
  });
});
