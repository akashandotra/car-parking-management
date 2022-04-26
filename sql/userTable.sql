DROP TABLE IF EXISTS user;
CREATE TABLE user (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  userEmail VARCHAR(256) UNIQUE NOT NULL,
  password VARCHAR(500) NOT NULL,
  fullName VARCHAR(500) NOT NULL,
  isAdmin INT (10) NOT NULL
);
INSERT INTO user (userEmail, password, fullName, isAdmin) 
  VALUES ("admin@gmail.com", "test1234", "Akash Andotra", 1);