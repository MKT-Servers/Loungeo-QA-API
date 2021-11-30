/* psql -d kim -f db/schemas/dataloader.sql */

\c qa;

\COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness /*answer_id*/) FROM 'db/data/questions.csv' WITH DELIMITER ',' CSV HEADER;

\COPY answers(answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness/*, photo_id*/) FROM 'db/data/answers.csv' WITH DELIMITER ',' CSV HEADER;

\COPY photos(id, answer_id, url) FROM 'db/data/answers_photos.csv' WITH DELIMITER ',' CSV HEADER;

create index idx_product_id on questions(product_id);
create index idx_answer_id on answers(question_id);
create index idx_photo_id on photos(id);

select setval(pg_get_serial_sequence('questions', 'question_id'),(SELECT MAX(question_id) FROM questions)+1);
select setval(pg_get_serial_sequence('answers', 'answer_id'),(SELECT MAX(answer_id) FROM answers)+1);
select setval(pg_get_serial_sequence('photos', 'id'),(SELECT MAX(id) FROM photos)+1);
