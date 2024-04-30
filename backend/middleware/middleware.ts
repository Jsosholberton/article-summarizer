import {Request, Response} from "express";
import {getUser} from "./getUser";

/**
 * Middleware to check the user's authentication using a JSON Web Token (JWT).
 * @function
 * @async
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware or route handler function.
 */
const checkAuth = async (req: Request, res: Response, next: any) => {
  let token: string;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const user = await getUser(token);

      if (!user) {
        return res.status(404).json({msg: "User not found"});
      }
      // Continue to the next middleware or route.

      return next();
    } catch (err) {
      return res.status(404).json({msg: "Something went wrong!" + err.message});
    }
  }

  if (!token) {
    const error = new Error("Invalid Token");
    return res.status(401).json({msg: error.message});
  }

  next();
};

export default checkAuth;