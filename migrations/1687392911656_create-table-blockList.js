exports.up = (pgm) => {
  pgm.createTable("blockList", {
    userId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    blockId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("blockList");
};
