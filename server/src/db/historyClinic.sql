
CREATE DATABASE IF NOT EXISTS HistoryClinic;
use HistoryClinic;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  email varchar(20) NOT NULL,
  password varchar(60) NOT NULL,
  PRIMARY KEY (id)
);
