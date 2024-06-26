import jwt from "jsonwebtoken";

const genJWT = (id: string) => {
  return jwt.sign({id}, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export default genJWT;