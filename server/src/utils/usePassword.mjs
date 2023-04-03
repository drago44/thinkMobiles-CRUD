import crypto from "crypto";

export const setPassword = (user, password) => {
  user.salt = crypto.randomBytes(16).toString("hex");
  user.hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

export const validPassword = (user, password) => {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return user.hash === hash;
};
