import User from "../models/User";
import genId from "../helpers/randomIdGenerator";
import genJWT from "../helpers/jwtGenerator";
import {emailReg, emailPwd} from "../helpers/emailSender"
import {Request, Response} from "express";
import {UserTypes} from "../types/user.types";

const register = async (req: Request, res: Response) => {

  // register duplicate
  const {email} = req.body;
  const existUser = await User.findOne({email});

  if (existUser) {
    const error = new Error('Email actually is register');
    return res.status(400).json({msg: error.message});
  }

  try {
    const user = new User(req.body);
    user.token = genId();
    await user.save();

    await emailReg({
      email: user.email,
      name: user.name,
      token: user.token
    });

    res.json({msg: "User created correctly, check your email to confirm the account"});
  } catch (err) {
    console.log(err);
  }
}

const authenticate = async (req: Request, res: Response) => {

  const {email, password} = req.body;
  // check if the email exists
  const instUser: UserTypes = await User.findOne({email});
  if (!instUser) {
    const error = new Error('User not exist');
    return res.status(404).json({msg: error.message});
  }
  // check if the user is confirmed
  if (!instUser.confirm) {
    const error = new Error('Your account is not confirmed');
    return res.status(404).json({msg: error.message});
  }
  // check the pwd
  if (await instUser.checkPassword(password)) {
    const _id = instUser._id;
    res.json({
      _id: _id,
      name: instUser.name,
      email: instUser.email,
      token: genJWT(_id.toString()),
    });
  } else {
    const error = new Error('The password is incorrect');
    return res.status(403).json({msg: error.message});
  }
};

const confirm = async (req: Request, res: Response) => {
  const {token} = req.params;
  const userConfirm = await User.findOne({token});
  if (!userConfirm) {
    const error = new Error('Invalid Token');
    return res.status(403).json({msg: error.message});
  }
  try {
    userConfirm.confirm = true;
    userConfirm.token = "";
    await userConfirm.save();
    return res.json({msg: "User confirm correctly"});
  } catch (err) {
    console.log(err);
  }
}

const lostPwd = async (req: Request, res: Response) => {
  const {email} = req.body;
  const instUser = await User.findOne({email});

  if (!instUser) {
    const error = new Error('User not exist');
    return res.status(404).json({msg: error.message});
  }

  try {
    instUser.token = genId();
    await instUser.save();
    res.json({msg: "We have sent an email with instructions"})

    await emailPwd({
      email: instUser.email,
      name: instUser.name,
      token: instUser.token
    });

  } catch (err) {
    console.log(err);
  }
};

const checkToken = async (req: Request, res: Response) => {
  const {token} = req.params;
  const validToken = await User.findOne({token});
  if (validToken) {
    res.json({msg: "Token is valid and the user exist"})
  } else {
    const error = new Error('Invalid token');
    return res.status(404).json({msg: error.message});
  }
};

const newPwd = async (req: Request, res: Response) => {
  const {token} = req.params;
  const {password} = req.body;

  const user = await User.findOne({token});

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({msg: "Password has been changed successfully"});
    } catch (err) {
      console.log(err);
    }
  } else {
    const error = new Error('Invalid token');
    return res.status(404).json({msg: error.message});
  }
};

const profile = async (req: Request, res: Response) => {
  return res.status(200).json(req.body);
}

export {
  register,
  authenticate,
  confirm,
  lostPwd,
  checkToken,
  newPwd,
  profile
}