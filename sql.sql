CREATE DATABASE jwt;
USE jwt;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) DEFAULT NULL,
  `password` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE USER node@'%' IDENTIFIED BY "pwd";
GRANT ALL PRIVILEGES ON users TO node@'%';
FLUSH PRIVILEGES;