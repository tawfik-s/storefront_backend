import express from 'express';

import { store_products, product } from '../models/product';

export const CreateProductController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (
      req.body.product_name == undefined ||
      req.body.product_price == undefined
    ) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain product_name and product_price'
        );
    } else {
      const new_product: product = {
        name: req.body.product_name,
        price: req.body.product_price,
      };
      const storeProduct = new store_products();
      const result = await storeProduct.create(new_product);
      res.status(200).send({ id: result });
    }
  } catch (error) {
    res.status(500).send('internal error happen ' + error);
  }
};

export const IndexProductController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const storeProduct = new store_products();
    const result = await storeProduct.index();
    res.send(result);
  } catch (error) {
    res.status(500).send('error happen while getting products');
  }
};

export const ShowProductController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.product_id == undefined) {
      res.status(400).send('please enter valid product_id');
    }
    const storeProduct = new store_products();
    const result = await storeProduct.show(req.body.product_id);
    res.send(result);
  } catch (error) {
    res.status(500).send('internal error happened');
  }
};

export const DeleteProductController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.product_id == undefined) {
      res.status(400).send('please enter valid product_id');
    }
    const storeProduct = new store_products();
    const result = await storeProduct.delete(req.body.product_id);
    res.send('element is deleted');
  } catch (error) {
    res.status(500).send('internal error happened');
  }
};

export const UpdateProductController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (
      req.body.product_id == undefined ||
      req.body.product_name == undefined ||
      req.body.product_price == undefined
    ) {
      res
        .status(400)
        .send(
          'please enter a valide parameters request body should contain product_id, product_name and product_price'
        );
    }
    const new_product = {
      id: req.body.product_id,
      name: req.body.product_name,
      price: req.body.product_price,
    };
    const storeProduct = new store_products();
    const result = await storeProduct.update(new_product);
    res.send(result);
  } catch (error) {
    res.status(500).send('internal error happen');
  }
};
