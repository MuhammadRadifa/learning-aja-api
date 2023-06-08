exports.up = (pgm) => {
  pgm.addConstraint(
    "notes",
    "fk_notes.ownerId",
    'FOREIGN KEY("ownerId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("notes", "fk_notes.userId");
};
