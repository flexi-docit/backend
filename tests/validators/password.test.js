const isStrongPassword = require("../../validators/password.js");

describe("Testing Password validator", () => {
  it("should return false for invalid passwords", () => {
    const passwords = [
      "",
      "hello",
      "hello@",
      "hello@company",
      "hello@company123",
    ];
    passwords.forEach((password) => {
      expect(isStrongPassword(password)).toBe(false);
    });
  });

  it("should return true for valid passwords", () => {
    const password = "Hello@company12";
    expect(isStrongPassword(password)).toBe(true);
  });
});
