class EditTodo {
  constructor(payload) {
    this._verifyPayload(payload);
    const { todoId, title, content, status } = payload;
    this.todoId = todoId;
    this.title = title;
    this.content = content;
    this.status = status;
  }

  _verifyPayload({ todoId, title, content }) {
    if (!todoId || !title || !content) {
      throw new Error("EDIT_TODO.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof todoId !== "string" ||
      typeof title !== "string" ||
      typeof content !== "string"
    ) {
      throw new Error("EDIT_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = EditTodo;
