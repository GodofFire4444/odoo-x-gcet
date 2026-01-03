import crypto from "crypto";

export const generatePassword = () => {
  return crypto.randomBytes(5).toString("hex");
};
