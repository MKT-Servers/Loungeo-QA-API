/* psql -d kim -f db/schemas/dataloader.sql */

\c qa;

\COPY questions(question_id, product_id, body, date_written, asker_name, asker_email, reported, question_helpfulness /*answer_id*/) FROM 'db/data/questions.csv' WITH DELIMITER ',' CSV HEADER;

\COPY answers(answer_id, question_id, body, date_written, answerer_name, answerer_email, reported, helpfulness/*, photo_id*/) FROM 'db/data/answers.csv' WITH DELIMITER ',' CSV HEADER;

\COPY photos(photo_id, answer_id, url) FROM 'db/data/answers_photos.csv' WITH DELIMITER ',' CSV HEADER;