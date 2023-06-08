exports.up = (pgm) => {
  pgm.createTable("notes", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    content: {
      type: "TEXT",
      notNull: false,
    },
    status: {
      type: "TEXT",
      notNull: true,
    },
    createdAt: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
    ownerId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("notes");
};
