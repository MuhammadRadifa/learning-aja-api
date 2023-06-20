exports.up = (pgm) => {
  pgm.createTable("meetingParticipant", {
    meetingId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    participantId: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("meetingParticipant");
};
