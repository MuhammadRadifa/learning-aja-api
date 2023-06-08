class PostTodo {
  constructor(payload) {
    this._verifyPayload(payload);
    const { title, content, ownerId } = payload;
    this.title = title;
    this.content = content;
    this.ownerId = ownerId;
  }

  _verifyPayload({ title, content, ownerId }) {
    if (!title || !content || !ownerId) {
      throw new Error("POST_TODO.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("POST_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (title.length > 50) {
      throw new Error("POST_TODO.TITLE_LIMIT_CHAR");
    }

    if (content.length > 1000) {
      throw new Error("POST_TODO.CONTENT_LIMIT_CHAR");
    }
  }
}

module.exports = PostTodo;
