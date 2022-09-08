import { store_orders, order } from '../models/order';
import express from 'express';

export const CreateOrderController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (
      req.body.user.id == undefined ||
      req.body.status == undefined ||
      req.body.product_id.length != req.body.quantity.length ||
      req.body.price == undefined
    ) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain' +
            'status, product_id, price and quantity. quantity and product_id is array equal quantity array'
        );
    }
    const storeOrders = new store_orders();
    const neworder: order = {
      user_id: req.body.user.id,
      status: req.body.status,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      price: req.body.price,
    };
    await storeOrders.CreateOrder(neworder);
    res.send('successfully added order');
  } catch (error) {
    res.status(500).send(`error in creating order ${error}`);
  }
};

export const DeleteOrderController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.user.id == undefined || req.body.order_id == undefined) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain' +
            'order_id'
        );
    }
    const storeOrders = new store_orders();
    const result = await storeOrders.getUserOrders(req.body.user.id);

    const userOrdersdWithTheRequiredID = result.filter(function (
      resultElement
    ) {
      return resultElement.id == req.body.order_id;
    });

    if (userOrdersdWithTheRequiredID.length == 0) {
      res.status(401).send('you are not authorized to delete this order');
    }
    await storeOrders.deleteOrder(req.body.order_id);
    res.send('successfully delete order');
  } catch (error) {
    res.status(500).send(`error in delete order ${error}`);
  }
};

export const GetUserOrdersController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.user_id == undefined) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain' +
            'user_id'
        );
    }
    const storeOrders = new store_orders();
    const result = storeOrders.getUserOrders(req.body.user_id);
    res.send(result);
  } catch (error) {
    res.status(500).send(`error in getting user orders ${error}`);
  }
};

export const GetMyOrders = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const storeOrders = new store_orders();
    const result = storeOrders.getUserOrders(req.body.user.id);
    res.send(result);
  } catch (error) {
    res.status(500).send(`error in getting your orders ${error}`);
  }
};

export const GetOrderProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.user.id == undefined || req.body.order_id == undefined) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain' +
            'order_id'
        );
    }
    const storeOrders = new store_orders();
    const result = await storeOrders.getUserOrders(req.body.user.id);

    const userOrdersdWithTheRequiredID = result.filter(function (
      resultElement
    ) {
      return resultElement.id == req.body.order_id;
    });

    if (userOrdersdWithTheRequiredID.length == 0) {
      res.status(401).send('you are not authorized to acess this order');
    }
    const orderProducts = await storeOrders.getOrderProducts(req.body.order_id);
    res.send(orderProducts);
  } catch (error) {
    res.status(500).send(`error in getting your order details${error}`);
  }
};

export const changeOrderStatusController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (
      req.body.user.id == undefined ||
      req.body.order_id == undefined ||
      req.body.status == undefined
    ) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain' +
            'order_id, status'
        );
    }
    if (!(req.body.status == 'complete' || req.body.status == 'active')) {
      res.status(400).send('please enter a valide status');
    }
    const storeOrders = new store_orders();
    const result = await storeOrders.getUserOrders(req.body.user.id);

    const userOrdersdWithTheRequiredID = result.filter(function (
      resultElement
    ) {
      return resultElement.id == req.body.order_id;
    });

    if (userOrdersdWithTheRequiredID.length == 0) {
      res.status(401).send('you are not authorized to acess this order');
    }
    const orderProducts = await storeOrders.UpdateOrderStatus(
      req.body.order_id,
      req.body.status
    );
    res.send('done');
  } catch (error) {
    res.status(500).send(`error in getting your order details${error}`);
  }
};
