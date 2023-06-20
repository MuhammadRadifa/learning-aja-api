exports.up = (pgm) => {
  pgm.createTable("meeting", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    date: {
      type: "TEXT",
      notNull: true,
    },
    time: {
      type: "TEXT",
      notNull: true,
    },
    location: {
      type: "TEXT",
      notNull: true,
    },
    ownerId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    createdAt: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("meeting");
};
