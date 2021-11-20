/* psql -d kim -f db/schemas/schema.sql */

DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE questions (
  question_id integer NOT NULL PRIMARY KEY,
  product_id integer NOT NULL,
  body varchar(3000) NOT NULL,
  date_written bigint NOT NULL,
  asker_name varchar(50) NOT NULL,
  asker_email varchar(100) NOT NULL,
  reported boolean NOT NULL,
  question_helpfulness integer NOT NULL
  -- answer_id integer NOT NULL REFERENCES answers(answer_id)
) WITH (
  OIDS=FALSE
  );

CREATE TABLE answers (
  answer_id integer NOT NULL PRIMARY KEY,
  question_id integer NOT NULL,
  body varchar(3000) NOT NULL,
  date_written bigint NOT NULL,
  answerer_name varchar(50) NOT NULL,
  answerer_email varchar(100) NOT NULL,
  reported boolean NOT NULL,
  helpfulness integer NOT NULL
  -- photo_id integer REFERENCES photos(photo_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE photos(
  photo_id integer NOT NULL PRIMARY KEY,
  answer_id integer NOT NULL,
  url varchar(300) NOT NULL
) WITH (
  OIDS=FALSE
);
