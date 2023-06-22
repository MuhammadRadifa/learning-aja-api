exports.up = (pgm) => {
  pgm.createTable("friendList", {
    userId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    friendId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("friendList");
};
