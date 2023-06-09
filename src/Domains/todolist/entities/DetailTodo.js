class DetailTodo {
  constructor(payload) {
    this._verifyPayload(payload);

    const { todoId } = payload;

    this.todoId = todoId;
  }

  _verifyPayload({ todoId }) {
    if (!todoId) {
      throw new Error("DETAIL_TODO.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof todoId !== "string") {
      throw new Error("DETAIL_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailTodo;
