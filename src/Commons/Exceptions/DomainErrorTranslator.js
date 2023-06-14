const InvariantError = require("./invariantError");

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
};

module.exports = DomainErrorTranslator;
