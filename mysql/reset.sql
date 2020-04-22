use db;

DROP TABLE IF EXISTS product_types, departments, users, orders, order_details, sales, sale_details, products, managed_departments;

CREATE TABLE product_types (
  product_type_id int PRIMARY KEY AUTO_INCREMENT,
  dept_id int,
  price int,
  product_type_name varchar(255)
);

CREATE TABLE departments (
  dept_id int PRIMARY KEY AUTO_INCREMENT,
  dept_name varchar(255),
  dept_mngr int
);

CREATE TABLE users (
  user_id int PRIMARY KEY AUTO_INCREMENT,
  type ENUM ('base_user', 'admin'),
  dept_id int,
  email varchar(255),
  password varchar(255),
  first varchar(255),
  last varchar(255)
);

CREATE TABLE orders (
  order_id int PRIMARY KEY AUTO_INCREMENT,
  order_date date
);

CREATE TABLE sales (
  sale_id int PRIMARY KEY AUTO_INCREMENT,
  sale_date date
);

CREATE TABLE products (
  product_id int PRIMARY KEY AUTO_INCREMENT,
  product_type_id int,
  order_id int,
  sale_id int,
  exp_date date,
  location ENUM ('back', 'shelf')
);

ALTER TABLE product_types ADD FOREIGN KEY (dept_id) REFERENCES departments (dept_id);

ALTER TABLE departments ADD FOREIGN KEY (dept_mngr) REFERENCES users (user_id);

ALTER TABLE users ADD FOREIGN KEY (dept_id) REFERENCES departments (dept_id);

ALTER TABLE products ADD FOREIGN KEY (product_type_id) REFERENCES product_types (product_type_id);

ALTER TABLE products ADD FOREIGN KEY (sale_id) REFERENCES sales (sale_id);

ALTER TABLE products ADD FOREIGN KEY (order_id) REFERENCES orders (order_id);

INSERT INTO users (type, email, password, first, last)
  VALUES
  ('base_user', 'abrooks@restock.com',   'password', 'Alice',  'Brooks'  ),
  ('admin',     'cdunn@restock.com',     'password', 'Carl',   'Dunn'    ),
  ('admin',     'efletcher@restock.com', 'password', 'Ellie',  'Fletcher'),
  ('base_user', 'ghansen@restock.com',   'password', 'Greg',   'Hansen'  ),
  ('base_user', 'ijones@restock.com',    'password', 'Isaac',  'Jones'   ),
  ('base_user', 'klong@restock.com',     'password', 'Kate',   'Long'    ),
  ('admin',     'mnunes@restock.com',    'password', 'Mark',   'Nunes'   ),
  ('base_user', 'operkins@restock.com',  'password', 'Oliver', 'Perkins' ),
  ('base_user', 'qroberts@restock.com',  'password', 'Quinn',  'Roberts' );

INSERT INTO departments (dept_name, dept_mngr)
  VALUES
  ('Dairy', 2),
  ('Meat',  7),
  ('Fish',  3);

UPDATE users SET dept_id = 2 WHERE user_id = 1;
UPDATE users SET dept_id = 1 WHERE user_id = 2;
UPDATE users SET dept_id = 3 WHERE user_id = 3;
UPDATE users SET dept_id = 1 WHERE user_id = 4;
UPDATE users SET dept_id = 3 WHERE user_id = 5;
UPDATE users SET dept_id = 1 WHERE user_id = 6;
UPDATE users SET dept_id = 2 WHERE user_id = 7;
UPDATE users SET dept_id = 2 WHERE user_id = 8;
UPDATE users SET dept_id = 3 WHERE user_id = 9;

INSERT INTO product_types (dept_id, product_type_name, price)
  VALUES
  (1, 'Cheese'         , 5),
  (1, 'Milk'           , 5),
  (1, 'Butter'         , 5),
  (1, 'Yogurt'         , 5),
  (1, 'Shredded Cheese', 5),
  (2, 'Steak'          , 5),
  (2, 'Chicken'        , 5),
  (2, 'Pork'           , 5),
  (2, 'Ground Beef'    , 5),
  (2, 'Turkey'         , 5),
  (3, 'Shrimp'         , 5),
  (3, 'Lobster'        , 5),
  (3, 'Salmon'         , 5),
  (3, 'Halibut'        , 5),
  (3, 'Sea Bass'       , 5);
INSERT INTO orders (order_date)
  VALUES
  ('2020-03-29'),
  ('2020-03-29'),
  ('2020-03-30'),
  ('2020-03-30'),
  ('2020-03-31'),
  ('2020-03-31');

INSERT INTO products (product_type_id, order_id, exp_date, location)
  VALUES
  ( 1, 3, '2020-04-14', 'shelf'),
  ( 2, 4, '2020-04-14', 'shelf'),
  ( 2, 4, '2020-04-14', 'shelf'),
  ( 2, 4, '2020-04-14', 'back' ),
  ( 2, 4, '2020-04-14', 'back' ),
  ( 3, 4, '2020-04-14', 'shelf'),
  ( 4, 3, '2020-04-14', 'shelf'),
  ( 4, 3, '2020-04-14', 'shelf'),
  ( 5, 3, '2020-04-14', 'shelf'),
  ( 5, 3, '2020-04-14', 'shelf'),
  ( 5, 3, '2020-04-14', 'back' ),
  ( 5, 3, '2020-04-14', 'back' ),
  ( 5, 3, '2020-04-14', 'back' ),
  ( 6, 1, '2020-04-14', 'shelf'),
  ( 6, 1, '2020-04-14', 'shelf'),
  ( 7, 2, '2020-04-14', 'shelf'),
  ( 7, 2, '2020-04-14', 'shelf'),
  ( 8, 1, '2020-04-14', 'shelf'),
  ( 8, 1, '2020-04-14', 'shelf'),
  ( 8, 1, '2020-04-14', 'back' ),
  ( 9, 1, '2020-04-14', 'shelf'),
  ( 9, 1, '2020-04-14', 'shelf'),
  ( 9, 1, '2020-04-14', 'back' ),
  ( 9, 1, '2020-04-14', 'back' ),
  (10, 2, '2020-04-14', 'shelf'),
  (10, 2, '2020-04-14', 'shelf'),
  (11, 5, '2020-04-14', 'shelf'),
  (11, 5, '2020-04-14', 'shelf'),
  (11, 5, '2020-04-14', 'back' ),
  (12, 5, '2020-04-14', 'shelf'),
  (13, 6, '2020-04-14', 'shelf'),
  (14, 6, '2020-04-14', 'shelf'),
  (15, 5, '2020-04-14', 'shelf'),
  (15, 5, '2020-04-14', 'shelf'),
  (15, 5, '2020-04-14', 'back' ),
  (15, 5, '2020-04-14', 'back' );