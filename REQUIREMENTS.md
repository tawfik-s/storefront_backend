# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

- Show **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/user/showme` - **id of the user to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `user object`

    ```json
    {
      "id": 1,
      "firstname": "toto",
      "lastname": "toto",
      "password": "$2b$10$7LApLqUxNcAuDasRap5.Q.0g5MKpWstBSXb9AbiFwiHzP.MJygoKq"
    }
    ```

- Create

  - HTTP verb `POST`
  - Endpoint:- `/user/register`
  - Request Body

    ```json
    {
      "firstname": "toto",
      "lastname": "to",
      "password": "testtest"
    }
    ```

  - Response Body -- `string`

    ```text
      ok
    ```

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- user/delete` //i will git id from auth token
  - Request Body

    ```json
      N/A
    ```

- Response Body -- `Deleted user object`

  ```text
  user deleted
  ```

- update **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/user/update`
  - Request Body

```json
{
  "id": 7,
  "firstname": "tawfik",
  "lastname": "to",
  "password": "newpass"
}
```

- Response Body -- `text`

  ```text
  user updated
  ```

- Authenticate

  - HTTP verb `POST`
  - Endpoint:- `/auth/login`
  - Request Body

    ```json
    {
      "firstname": "toto",
      "lastname": "toto",
      "password": "testtest"
    }
    ```

  - Response Body -- `token in object`

    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoidG90byIsImxhc3RuYW1lIjoidG90byIsInBhc3N3b3JkIjoiJDJiJDEwJDdMQXBMcVV4TmNBdURhc1JhcDUuUS4wZzVNS3BXc3RCU1hiOUFiaUZ3aUh6UC5NSnlnb0txIiwiaWF0IjoxNjYyNzQ1NTg5fQ.OiAkz1bBWKR4_bEX4arJ3JhhRBc-CGD12loPpxk3jkQ"
    }
    ```

#### Products

- Index

  - HTTP verb `GET`
  - Endpoint:- `/product/index`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of product objects`

```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": 1,
        "name": "product name",
        "price": 20
      }
    ]
  },
  "message": "Products retrieved successfully"
}
```

- Show

  - HTTP verb `GET`
  - Endpoint:- `/api/products/:id` - **id of the product to be retrieved**
  - Request Body

```json
      N/A
```

- Response Body -- `Product object`

```json
[

    {
        "id": 8,
        "name": "casioAE1000",
        "price": 3000
    },
    {
        "id": 11,
        "name": "watch",
        "price": 1000
    },
    {
        "id": 12,
        "name": "watch",
        "price": 1000
    },
    {
        "id": 13,
        "name": "watch",
        "price": 1000
    },
    {
        "id": 15,
        "name": "watch",
        "price": 1000
    },
    {
        "id": 16,
        "name": "watch",
        "price": 1000
    },
    {
        "id": 17,
        "name": "watch",
        "price": 1000
    }
]
```

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/product/create`
  - Request Body

```json
   {
    "product_name":"watch",
    "product_price":1000
}
```

  - Response Body -- `product id`

```json
{
 "id": 23
}
```

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/product/delete`
  - Request Body

```json
     {
    "product_id":10
}
```

  - Response Body -- `text`

```text
    element is deleted

```

- update **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/product/update`
  - Request Body

    ```json
    {
        "product_id":8,
        "product_name":"casioAE1000",
        "product_price":3000
    }
    ```

  - Response Body -- `Updated User object`
 ```json
   {
    "id": 8,
    "name": "casioAE1000",
    "price": 3000
}
 ```

#### Orders

- Index - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orders/myorders`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of order objects, including an array of products added to the order and the associated user`

    ```json
    {
    "result": [
        {
            "id": 3,
            "status": "active",
            "price": 2000
        },
        {
            "id": 2,
            "status": "complete",
            "price": 2000
        }
    ]
}
    ```

- Show - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orders/products`
  - Request Body

    ```json
      {
    "order_id":2
}
    ```

  - Response Body -- `array of objects contain product id and quntity`

    ```json
    [
    {
        "product_id": 8,
        "quantity": 2
    },
    {
        "product_id": 2,
        "quantity": 3
    },
    {
        "product_id": 3,
        "quantity": 1
    }
]
    ```

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `//orders/create`
  - Request Body

    ```json
{
      "status": "active",
      "product_id": [8, 2, 3],
      "quantity": [2, 3, 1],
      "price": 2000
}
    ```

  - Response Body -- `text successfully added order`

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/orders/delete` - **id of the order to be deleted**
  - Request Body

    ```json
      {
    "order_id":1
}
    ```

  - Response Body -- `Deleted  text`



- update **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/orders/newstatus`
  - Request Body

    ```json
{
    "order_id":2,
    "status":"complete"
}
    ```

  - Response Body -- `Updated User text`


## database schema

### table user schema

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(255)
);
````

### table product schema

```sql

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   price integer);

```

### table orders schema

```sql

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(15),
    price integer
);

```

### table orders product schema

```sql

CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id) NOT NULL,
    product_id integer REFERENCES product(id) NOT NULL,
    quantity integer
);

```
