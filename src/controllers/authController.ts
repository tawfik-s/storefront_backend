/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import express from 'express';
import { store_users, user } from '../models/user';
import { checkPlainPassword } from '../services/checkPlainPassword';
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

export const loginController = async (
  req: express.Request,
  res: express.Response
) => {
  // send access token
  try {
    if (
      req.body.firstname == undefined ||
      req.body.lastname == undefined ||
      req.body.password == undefined
    ) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain firstname ,lastname,password'
        );
    }
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const User: user = {
      id: 0,
      firstname: firstname,
      lastname: lastname,
      password: '',
    };

    //encrypt the password;
    const storeuser = new store_users();
    const result = await storeuser.checkIfUserExist(User);

    if (result == undefined) {
      res.status(400).json({
        message: 'authentication faulire first name and last name error',
      });
    } else if (checkPlainPassword(req.body.password, result.password)) {
      const accessToken = jwt.sign(
        result,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as string;
      res.cookie('accessToken', accessToken);
      res.send({ accessTokent: accessToken });
    } else {
      res.status(401).json({
        message: 'authentication faulire password error',
      });
    }
  } catch (err) {
    res.status(401).send({ message: 'authentication failure' });
  }
};
