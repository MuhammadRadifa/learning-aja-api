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
  "POST_TODOLIST.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menambahkan note baru karena properti yang dibutuhkan tidak ada"
  ),
  "POST_TODOLIST.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat note baru karena tipe data tidak sesuai"
  ),
  "POST_TODOLIST.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "POSTED_TODOLIST.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat note baru karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_TODOLIST.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat note baru karena tipe data tidak sesuai"
  ),
  "POSTED_TODOLIST.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "ADDED_TODOLIST.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat note baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADDED_TODOLIST.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat note baru karena tipe data tidak sesuai"
  ),
  "POST_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menambahkan jadwal baru karena properti yang dibutuhkan tidak ada"
  ),
  "POST_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
  ),
  "POSTED_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat jadwal baru karena properti yang dibutuhkan tidak ada"
  ),
  "POSTED_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
  ),
  "POSTED_SCHEDULE.TITLE_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "ADDED_SCHEDULE.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat jadwal baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADDED_SCHEDULE.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat jadwal baru karena tipe data tidak sesuai"
  ),
};

module.exports = DomainErrorTranslator;
