const InputValidator = require("../../Applications/security/InputValidator");
const InvariantError = require("../../Commons/Exceptions/invariantError");

class JoiInputValidator extends InputValidator {
  constructor(joi) {
    super();
    this._joi = joi;
  }

  async ValidateUsername(username) {
    const usernameSchema = this._joi.string().min(3).max(50).required();
    const { error } = usernameSchema.validate(username);

    if (error) {
      throw new InvariantError(error.message);
    }

    return username;
  }

  async ValidatePassword(password) {
    const passwordSchema = this._joi
      .string()
      .min(8)
      .pattern(/^[\w]+$/);

    const { error } = passwordSchema.validate(password);

    if (error) {
      throw new InvariantError(error.message);
    }

    return password;
  }

  async ValidateEmail(email) {
    const emailSchema = this._joi.string().email({ minDomainSegments: 2 });

    const { error } = emailSchema.validate(email);

    if (error) {
      throw new InvariantError(error.message);
    }

    return email;
  }
}

module.exports = JoiInputValidator;
