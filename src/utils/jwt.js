import jwt from "jsonwebtoken";

const SECRET_KEY = "5mcetT1YzQE5VFTWlw99EGVhHUJqVPh8";

export const jwtSign = (data, expiresIn = "5m") =>
  jwt.sign(data, SECRET_KEY, { expiresIn });

export const jwtVerify = (_data) => {
  let data;
  try {
    data = jwt.verify(_data, SECRET_KEY);
  } catch (e) {
    data = {
      items: [],
      total: 0,
    };
  }
  return data;
};
