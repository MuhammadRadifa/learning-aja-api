class ChatHandler {
  constructor(container) {
    this._container = container;

    this.startChatHandler = this.startChatHandler.bind(this);
  }

  async startChatHandler() {
    return {
      status: "success",
    };
  }
}

module.exports = ChatHandler;
