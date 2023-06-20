exports.up = (pgm) => {
  pgm.addConstraint(
    "meetingParticipant",
    "fk_meetingParticipant.meetingId",
    'FOREIGN KEY("meetingId") REFERENCES meeting(id) ON DELETE CASCADE'
  );
  pgm.addConstraint(
    "meetingParticipant",
    "fk_meetingParticipant.participantId",
    'FOREIGN KEY("participantId") REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("meetingParticipant", "fk_meetingParticipant.meetingId");
  pgm.dropConstraint(
    "meetingParticipant",
    "fk_meetingParticipant.participantId"
  );
};
