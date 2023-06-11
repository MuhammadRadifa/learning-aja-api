class PostedTodo {
  constructor(payload) {
    this._verifyPayload(payload);
    const { id, title, content, status, createdAt, ownerId } = payload;
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.createdAt = createdAt;
    this.ownerId = ownerId;
  }

  _verifyPayload({ id, title, content, ownerId }) {
    if (!id || !title || !content || !ownerId) {
      throw new Error("POSTED_TODO.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("POSTED_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PostedTodo;
