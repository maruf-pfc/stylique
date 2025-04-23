const bcrypt = require("bcryptjs");
const comparePassword = require("../../utils/comparePassword");

describe("comparePassword", () => {
  it("should return true when passwords match", async () => {
    const plainPassword = "secure123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const result = await comparePassword(plainPassword, hashedPassword);
    expect(result).toBe(true);
  });

  it("should return false when passwords do not match", async () => {
    const plainPassword = "secure123";
    const hashedPassword = await bcrypt.hash("otherpassword", 10);

    const result = await comparePassword(plainPassword, hashedPassword);
    expect(result).toBe(false);
  });
});
