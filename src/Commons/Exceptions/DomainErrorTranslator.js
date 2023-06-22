const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan email dan password"
  ),
  "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "email dan password harus string"
  ),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),
  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),
  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),
  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),
  "POST_TODO.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat todo baru karena properti yang dibutuhkan tidak ada"
  ),
  "POST_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat todo baru karena tipe data tidak sesuai"
  ),
  "POST_TODO.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "POSTED_TODO.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat todo baru karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat todo baru karena tipe data tidak sesuai"
  ),
  "POSTED_TODO.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat todo baru karena karakter username melebihi batas limit"
  ),
  "ADDED_TODO.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat todo baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADDED_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat todo baru karena tipe data tidak sesuai"
  ),
  "DETAIL_TODO.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menampilkan detail todo karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menampilkan detail todo karena tipe data tidak sesuai"
  ),
  "UPDATE_TODO.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengubah todo karena properti yang dibutuhkan tidak ada"
  ),
  "UPDATE_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengubah todo karena tipe data tidak sesuai"
  ),
  "UPDATE_TODO.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat mengubah todo karena karakter username melebihi batas limit"
  ),
  "DELETE_TODO.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menghapus todo karena properti yang dibutuhkan tidak ada"
  ),
  "DELETE_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menghapus todo karena tipe data tidak sesuai"
  ),
  "POST_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat jadwal baru karena properti yang dibutuhkan tidak ada"
  ),
  "POST_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
  ),
  "POST_SCHEDULE.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat jadwal baru karena karakter title melebihi batas limit"
  ),
  "POST_SCHEDULE.LECTURER_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat jadwal baru karena karakter lecturer melebihi batas limit"
  ),
  "POST_SCHEDULE.ROOM_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat jadwal baru karena karakter room melebihi batas limit"
  ),
  "POSTED_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat jadwal baru karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
  ),
  "POSTED_SCHEDULE.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat jadwal baru karena karakter title melebihi batas limit"
  ),
  "ADDED_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat jadwal baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADDED_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
  ),
  "GET_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menampilkan user karena properti yang dibutuhkan tidak ada"
  ),
  "GET_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menampilkan user karena tipe data tidak sesuai"
  ),
  "POST_MEETING.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat meeting baru karena tipe data tidak sesuai"
  ),
  "POST_MEETING.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat meeting baru karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_MEETING.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat meeting baru karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_MEETING.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat meeting baru karena tipe data tidak sesuai"
  ),
  "POST_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menambahkan teman karena properti yang dibutuhkan tidak ada"
  ),
  "POST_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menambahkan teman karena tipe data tidak sesuai"
  ),
  "POSTED_FRIEND.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menambahkan teman karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_FRIEND.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menambahkan teman karena tipe data tidak sesuai"
  ),
  "ACCEPT_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat menerima teman karena properti yang dibutuhkan tidak ada"
  ),
  "ACCEPT_FRIEND_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menerima teman karena tipe data tidak sesuai"
  ),
  "DELETE_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat menghapus teman karena properti yang dibutuhkan tidak ada"
  ),
  "DELETE_FRIEND_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menghapus teman karena tipe data tidak sesuai"
  ),
  "DELETE_SCHEDULE_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat menghapus jadwal karena properti yang dibutuhkan tidak ada"
  ),
  "DELETE_SCHEDULE_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat menghapus jadwal karena tipe data tidak sesuai"
    ),
  "GET_MEETING_DETAIL_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat menampilkan detail meeting karena properti yang dibutuhkan tidak ada"
  ),
  "GET_MEETING_DETAIL_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat menampilkan detail meeting karena tipe data tidak sesuai"
    ),
  "REJECT_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat menolak teman karena properti yang dibutuhkan tidak ada"
  ),
  "REJECT_FRIEND_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menolak teman karena tipe data tidak sesuai"
  ),
  "BLOCK_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat memblokir teman karena properti yang dibutuhkan tidak ada"
  ),
  "BLOCK_FRIEND_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat memblokir teman karena tipe data tidak sesuai"
  ),
  "UNBLOCK_FRIEND_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD": new InvariantError(
    "tidak dapat membuka blokir teman karena properti yang dibutuhkan tidak ada"
  ),
  "UNBLOCK_FRIEND_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat membuka blokir teman karena tipe data tidak sesuai"
    ),
  "GET_FRIEND_LIST_REQUEST_USE_CASE.NOT_CONTAIN_NEEDED_PAYLOAD":
    new InvariantError(
      "tidak dapat menampilkan daftar teman karena properti yang dibutuhkan tidak ada"
    ),
  "GET_FRIEND_LIST_REQUEST_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat menampilkan daftar teman karena tipe data tidak sesuai"
    ),
  "GET_FRIEND_BLOCKED_LIST.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menampilkan daftar teman yang diblokir karena properti yang dibutuhkan tidak ada"
  ),
  "GET_FRIEND_BLOCKED_LIST.NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError(
      "tidak dapat menampilkan daftar teman yang diblokir karena tipe data tidak sesuai"
    ),
};

module.exports = DomainErrorTranslator;
