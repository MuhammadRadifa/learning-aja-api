const InputValidator = require("../InputValidator");

describe("InputValidator interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const inputValidator = new InputValidator();

    // Action & Assert
    await expect(inputValidator.ValidateUsername("")).rejects.toThrowError(
      "INPUT_VALIDATOR.METHOD_NOT_IMPLEMENTED"
    );
    await expect(inputValidator.ValidatePassword("")).rejects.toThrowError(
      "INPUT_VALIDATOR.METHOD_NOT_IMPLEMENTED"
    );
    await expect(inputValidator.ValidateEmail("")).rejects.toThrowError(
      "INPUT_VALIDATOR.METHOD_NOT_IMPLEMENTED"
    );
  });
});
