DROP DATABASE IF EXISTS pajarito3026;
CREATE DATABASE pajarito3026;

\c pajarito3026

DROP TABLE IF EXISTS pajarito3026;
CREATE TABLE tweets(
  tweetid SERIAL PRIMARY KEY,
  tweetext VARCHAR(250)
);

INSERT INTO tweets(tweetext) VALUES('Looking forward to some R&R this weekend.')