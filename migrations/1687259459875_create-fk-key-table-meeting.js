exports.up = (pgm) => {
  pgm.addConstraint(
    "meeting",
    "fk_meeting.ownerId",
    'FOREIGN KEY("ownerId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("meeting", "fk_meeting.ownerId");
};
