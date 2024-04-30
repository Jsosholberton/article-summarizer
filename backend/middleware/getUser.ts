import {DecodedTypes} from "../types/decoded.types";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const getUser = async (token: string) => {
  const decoded: DecodedTypes = jwt.verify(token, process.env.JWT_SECRET!) as DecodedTypes;

  // Retrieve the user associated with the token and exclude sensitive information
  return User.findById(decoded.id).select("-password -confirm -token -createdAt -updatedAt -__v");
}
