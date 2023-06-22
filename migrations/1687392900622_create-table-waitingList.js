exports.up = (pgm) => {
  pgm.createTable("waitingList", {
    senderId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    receiverId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("waitingList");
};
