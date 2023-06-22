exports.up = (pgm) => {
  pgm.addConstraint(
    "friendList",
    "fk_friendList.userId",
    'FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE'
  );
  pgm.addConstraint(
    "friendList",
    "fk_friendList.friendId",
    'FOREIGN KEY("friendId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("friendList", "fk_friendList.userId");
  pgm.dropConstraint("friendList", "fk_friendList.friendId");
};
