import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "../user/models";
import signJWT from "../services/jwt";
import Author from "../author/models";
import * as repo from "../user/repo";
import Logging from "../library/Logging";

const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError: any, hash: any) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError,
      });
    }

    const createUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hash,
    });

    return createUser
      .save()
      .then((user) => {
        return res.status(200).json({
          user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  User.find({ username })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Password Mismatch",
          });
        } else if (result) {
          signJWT(users[0], (_error, token) => {
            if (_error) {
              return res.status(500).json({
                message: _error.message,
                error: _error,
              });
            } else if (token) {
              return res.status(200).json({
                message: "Auth successful",
                token: token,
                user: users[0],
              });
            }
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const valiToken = repo.validateToken(req, res, next);
    return valiToken;
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export default { register, login, validateToken };
