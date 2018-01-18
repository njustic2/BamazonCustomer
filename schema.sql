DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40),
    department_name VARCHAR(30),
    price DECIMAL (9, 2) NOT NULL,
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;


1,Big Trouble In Little China,Movies,9.99,31
2,Cloud Cult: Advice from the happy hippo,Music Albums,14.99,84
3,Dark Souls,Video Games,39.98,14
4,Survive,Board Games,26.49,3
5,Sweetend Condensed Milk,Canned Goods,2.69,170
6,LA Sportiva Speedster,Climbing Shoes,165.99,7
7,Ween: All requests live,Music Albums,11.99,23
8,Vurt by Jeff Noon,Books,29.98,22
9,The Sirens of Titan by Kurt Vonnegut,Books,14.99,23
10,Super Nintendo Entertainment System,Classic Consoles,119.34,1