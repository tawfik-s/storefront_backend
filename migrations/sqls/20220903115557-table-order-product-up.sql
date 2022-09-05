CREATE TABLE order_product(
id SERIAL PRIMARY KEY,
order_id integer REFERENCES orders(id) NOT NULL,
product_id integer REFERENCES product(id) NOT NULL,
quantity integer
);