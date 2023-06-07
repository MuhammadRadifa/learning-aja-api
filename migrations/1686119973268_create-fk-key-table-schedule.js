exports.up = (pgm) => {
  pgm.addConstraint(
    "schedules",
    "fk_schedules.ownerId",
    'FOREIGN KEY("ownerId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("schedules", "fk_schedules.userId");
};
