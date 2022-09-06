/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import express from 'express';
import { store_users } from '../models/user';
export const logoutController = (
  req: express.Request,
  res: express.Response
) => {
  // delete token
  try {
    res.clearCookie('accessToken');
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send({ message: 'logout error' });
  }
};

exports.loginController = async (
  req: express.Request,
  res: express.Response
) => {
  // send access token
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const user = {
      first_name: first_name,
      last_name: last_name,
      password: password,
    };

    //encrypt the password;
    const storeuser = new store_users();
    const result = await storeuser.checkIfUserExist(user);

    if (result == undefined) {
      res.status(401).json({
        message: 'authentication faulire please register or reenter password',
      });
    } else {
      const accessToken = jwt.sign(
        result,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as string;
      res.cookie('accessToken', accessToken);
      res.send();
      // res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
  } catch (err) {
    res.status(401).send({ message: 'authentication failure' });
  }
};
