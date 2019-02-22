DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE product (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM product;

INSERT INTO product (item_id, product_name, department_name, price, stock_quantity)
VALUES (01, "MACBOOK", "TECH", 2500.00, 10), 
(02, "AXE", "OUTDOOR", 40.50, 1000), 
(03, "PIE", "FOOD", 22.50, 40), 
(04, "JACKET", "FASHION", 112.25, 500), 
(05, "TV", "TECH", 800.77, 200), 
(06, "BOOTS", "OUTDOOR", 70.50, 1200), 
(07, "APPLES", "FOOD", 1.50, 400), 
(08, "DRESS", "FASHION", 552.25, 555), 
(09, "DVD", "TECH", 25.00, 9999), 
(10, "PANTS", "FASHION", 88.25, 500);

