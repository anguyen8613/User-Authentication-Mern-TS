import User from '../models/userModel';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, passwordVerify } = req.body;

    //vadidation
    if (!email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: 'Please use a password of atleast 6 chars.' });
    }

    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: 'Please enter matching passwords' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: 'Email already in use' });
    }

    //hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account
    const newUser = new User({ email, password: passwordHash });
    const savedUser = await newUser.save();

    //log in the user after they created the account
    //use json web token so only our app can log the use in

    //sign the token
    const token = jwt.sign({ user: savedUser._id }, config.server.token.secret);

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .json({ userId: savedUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields' });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ errorMessage: 'Incorrect email or password.' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ errorMessage: 'Incorrect email or password.' });
    }

    //sign the token
    const token = jwt.sign(
      { user: existingUser._id },
      config.server.token.secret
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .json({ userId: existingUser._id });
  } catch (err) {
    res.status(500).send({ errorMessage: 'Incorrect email or password.' });
  }
};

const logout = (req: Request, res: Response) => {
  //clear cookie with key = token
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    })
    .send();
};

const isLoggedIn = (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, config.server.token.secret);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
};

const controller = { register, login, logout, isLoggedIn };

export default controller;
