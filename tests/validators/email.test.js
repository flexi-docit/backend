const isValidEmail = require("../../validators/email.js");

describe("Testing Email validator", () => {
  it("should return false for invalid emails", () => {
    const emails = ["", "hello", "hello@", "hello@company"];
    emails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  it("should return true for valid emails", () => {
    const email = "hello@company.com";

    expect(isValidEmail(email)).toBe(true);
  });
});
