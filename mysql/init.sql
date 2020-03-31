use db;

DROP TABLE IF EXISTS `products`, `departments`, `users`, `orders`, `order_details`, `sales`, `sale_details`, `inventory`, `managed_departments`;

CREATE TABLE `products` (
  `product_id` int PRIMARY KEY AUTO_INCREMENT,
  `dept_id` int,
  `shelf_stock` int,
  `back_stock` int,
  `productName` varchar(255)
);

CREATE TABLE `departments` (
  `dept_id` int PRIMARY KEY AUTO_INCREMENT,
  `dept_name` varchar(255),
  `dept_mngr` int
);

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM ('base_user', 'admin'),
  `dept_id` int,
  `email` varchar(255),
  `password` varchar(255),
  `first` varchar(255),
  `last` varchar(255)
);

CREATE TABLE `orders` (
  `order_id` int PRIMARY KEY AUTO_INCREMENT,
  `order_date` datetime
);

CREATE TABLE `order_details` (
  `order_id` int,
  `inventory_id` int
);

CREATE TABLE `sales` (
  `sale_id` int PRIMARY KEY AUTO_INCREMENT,
  `sale_date` datetime
);

CREATE TABLE `sale_details` (
  `sale_id` int,
  `inventory_id` int
);

CREATE TABLE `inventory` (
  `inventory_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `dept_id` int,
  `exp_date` datetime,
  `location` varchar(255)
);

CREATE TABLE `managed_departments` (
  `user_id` int,
  `dept_id` int
);

ALTER TABLE `managed_departments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `managed_departments` ADD FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`);

ALTER TABLE `departments` ADD FOREIGN KEY (`dept_mngr`) REFERENCES `users` (`user_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`);

ALTER TABLE `order_details` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_details` ADD FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`);

ALTER TABLE `sale_details` ADD FOREIGN KEY (`sale_id`) REFERENCES `sales` (`sale_id`);

ALTER TABLE `sale_details` ADD FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`);

ALTER TABLE `inventory` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `inventory` ADD FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`);

-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- give access to manager on db
GRANT ALL PRIVILEGES ON db.* TO 'manager'@'%';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

-- flush them privileges
FLUSH PRIVILEGES;