exports.up = (pgm) => {
  pgm.addConstraint(
    "blockList",
    "fk_blockList.userId",
    'FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE'
  );
  pgm.addConstraint(
    "blockList",
    "fk_blockList.blockId",
    'FOREIGN KEY("blockId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("blockList", "fk_blockList.userId");
  pgm.dropConstraint("blockList", "fk_blockList.blockId");
};
