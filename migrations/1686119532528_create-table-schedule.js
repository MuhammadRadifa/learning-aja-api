exports.up = (pgm) => {
  pgm.createTable("schedules", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    lecturer: {
      type: "TEXT",
      notNull: false,
    },
    room: {
      type: "TEXT",
      notNull: true,
    },
    classTime: {
      type: "TEXT",
      notNull: false,
    },
    schedule: {
      type: "timestamp",
      notNull: true,
    },
    ownerId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    createdAt: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("schedules");
};
