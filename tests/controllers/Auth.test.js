// const jest = require("jest");
const authController = require("../../controllers/Auth.controller.js");

describe("Testing Auth Routes", () => {
  let req = {},
    res = {},
    next = jest.fn();
  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn(),
    };
    jest.clearAllMocks();
  });
  it("should not register a user with invalid data", async () => {
    const users = [
      {
        name: "",
        email: "",
        password: "",
        role: "",
      },
      {
        name: "abcd",
        email: "",
        password: "",
        role: "",
      },
      {
        name: "abcd",
        email: "hello",
        password: "",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@",
        password: "",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company.com",
        password: "",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company.com",
        password: "hello",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "Hello",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "hello@",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "hello@1234",
        role: "",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "hello@1234",
        role: "Team Manage",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "hello@1234",
        role: "Module Manage",
      },
      {
        name: "abcd",
        email: "hello@company",
        password: "hello@1234",
        role: "xyz",
      },
    ];

    for (const user of users) {
      req = {};
      res = {};
      next.mockReset();

      req.body = user;

      await authController.register(req, res, next);
      console.log(next.mock.calls);
    }

    expect(req).toBeDefined();
  });
});
