# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show (args: id)[token required]
- Create (args: User)

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## database schema

### table user schema

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(255)
);
```

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
