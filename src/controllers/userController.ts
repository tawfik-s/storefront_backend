import express from 'express';
import { store_users, user } from '../models/user';
import { incrypt } from '../services/incryptPassService';

export const showMyDataController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const storeuser = new store_users();
    const result = await storeuser.show(req.body.user.id);
    res.send(result);
  } catch (error) {
    res.status(400).send('error while regester the new user');
  }
};

export const RegisterUserController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    console.log(req.body);
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
      console.log(
        'please enter a valide parameters request body should contain firstname ,lastname,password'
      );
    } else {
      const storeuser = new store_users();
      const User: user = {
        id: 0,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: '',
      };
      const flag = await storeuser.checkIfUserExist(User);
      if (flag != undefined) {
        console.log('dublicate first and last name');
        res.status(409).send('dublicate first and last name');
      } else {
        const hash: string = incrypt(req.body.password);
        User.password = hash;
        const result = await storeuser.create(User);
        console.log(result);
        res.sendStatus(200).send(result);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('error while regester the new user');
  }
};

export const UpdateUserController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (
      req.body.user.id == undefined ||
      req.body.firstname == undefined ||
      req.body.lastname == undefined ||
      req.body.password == undefined
    ) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain firstname ,lastname,password'
        );
    } else {
      const storeuser = new store_users();
      const User: user = {
        id: req.body.user.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: '',
      };
      const hash: string = incrypt(req.body.password);
      User.password = hash;
      const result = await storeuser.update(User);
      res.send('user updated');
    }
  } catch (error) {
    res.status(400).send('error while update the user data');
  }
};

export const DeleteUserController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.user.id == undefined) {
      res.status(400).send('you are not authorized');
    } else {
      const storeuser = new store_users();
      await storeuser.delete(req.body.user.id);
      res.send('user deleted');
    }
  } catch (error) {
    res.status(400).send('error while regester the new user');
  }
};
