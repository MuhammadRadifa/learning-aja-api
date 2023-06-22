exports.up = (pgm) => {
  pgm.addConstraint(
    "waitingList",
    "fk_waitingList.senderId",
    'FOREIGN KEY("senderId") REFERENCES users(id) ON DELETE CASCADE'
  );
  pgm.addConstraint(
    "waitingList",
    "fk_waitingList.receiverId",
    'FOREIGN KEY("receiverId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("waitingList", "fk_waitingList.senderId");
  pgm.dropConstraint("waitingList", "fk_waitingList.receiverId");
};
