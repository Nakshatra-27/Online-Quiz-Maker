CREATE DATABASE quizdb;

USE quizdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  score INT DEFAULT NULL,
  taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from users;