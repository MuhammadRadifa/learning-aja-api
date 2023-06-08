const joi = require("joi");
const InvariantError = require("../../../Commons/Exceptions/invariantError");
const JoiInputValidator = require("../JoiInputValidator");

describe("JoiInputValidator", () => {
  describe("ValidateUsername function", () => {
    it("should throw InvariantError when username not meet criteria", async () => {
      // Arrange
      const joiInputValidator = new JoiInputValidator(joi);

      // Action & Assert
      await expect(
        joiInputValidator.ValidateUsername("di")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when username meet criteria", async () => {
      // Arrange
      const joiInputValidator = new JoiInputValidator(joi);

      // Action & Assert
      await expect(
        joiInputValidator.ValidateUsername("dicoding")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("ValidatePassword function", () => {
    it("should throw InvariantError when password not meet criteria", async () => {
      // Arrange
      const joiInputValidator = new JoiInputValidator(joi);

      // Action & Assert
      await expect(
        joiInputValidator.ValidatePassword("12345")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when password meet criteria", async () => {
      // Arrange
      const joiInputValidator = new JoiInputValidator(joi);

      // Action & Assert
      await expect(
        joiInputValidator.ValidatePassword("Dicoding123")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("ValidateEmail function", () => {
    it("should throw InvariantError when email not meet criteria", async () => {
      // Arrange
      const joiInputValidator = new JoiInputValidator(joi);

      // Action & Assert
      await expect(
        joiInputValidator.ValidateEmail("dicoding")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when email meet criteria", async () => {
      // Arrange
      const joiInputValidator = new JoiInputValidator(joi);

      // Action & Assert
      await expect(
        joiInputValidator.ValidateEmail("dicoding@gmail.com")
      ).resolves.not.toThrowError(InvariantError);
    });
  });
});
