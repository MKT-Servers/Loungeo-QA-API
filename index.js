const express = require('express');
const db = require('./db');
const app = express();

const port = 3000;
app.use(express.json())


// Get Questions
app.get('/qa/questions/:id', (req, res) => {
  const { id } = req.params;
  const {
    page = 1,
    count = 5,
  } = req.query;

  if (req.params.question_id) {
    console.log('invalid product id');
    res.sendStatus(400);
  } else if (page < 1 || count < 1) {
    console.log('invalid number of responses');
    res.sendStatus(400);
  }

  db.query('select question_id, question_body, to_timestamp(question_date/1000)::timestamp, asker_name, question_helpfulness from questions where product_id = $1 and reported = false', [ id ])
  .then(data => {
    const result = {
      product_id: id,
      results: data.rows,
    }
    res.send(result);
  })

})

// Get Answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const {
    page = 1,
    count = 5,
  } = req.query;
  if (!req.params.question_id) {
    console.log('invalid product id');
    res.sendStatus(400);
  } else if (page < 1 || count < 1) {
    console.log('invalid number of responses');
    res.sendStatus(400);
  }

  db.query('select answer_id, body, to_timestamp(date/1000)::timestamp, answerer_name, helpfulness from answers where question_id = $1 and reported = false', [ question_id])
   .then(data => res.send(data.rows))
   .catch(err => res.send(err));
})

// Post Question
app.post('/qa/questions', (req, res) => {
  const { body, name, email, product_id } = req.body;
  db.query('insert into questions(product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) values ($1, $2, select extract(epoch from now()), $3, $4, false, 0)', [product_id, body, name, email])
  .then(data => console.log(data))
  .then(res.sendStatus(200))
  .catch(err => res.send(400));
})

// Post answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { body, name, email, photos } = req.body;
  const { question_id } = req.params;

  db.query('insert into answers(question_id, body, date, answerer_name, answerer_email, reported, helpfulness) values($1, $2, select extract(epoch from now()), $3, $4, false, 0)', [question_id, body, name, email, photos])
  .then(res.sendStatus(200))
  .catch(err => res.send(400))
})

// Mark Question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params;

  db.query('update questions set question_helpfulness = question_helpfulness + 1 where question_id = $1', [ question_id ])
    .then(res.sendStatus(200))
    .catch(res.sendStatus(400))
})

// Report Question
app.put('/qa/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params;

  db.query('update questions set reported = true where question_id = $1', [ question_id ])
  .then(res.sendStaus(200))
  .catch(res.sendStatus(400))
})

//Mark Answer as helpful
app.put('/qa/answers/:answer_id/helpul', (req, res) => {
  const { answer_id } = req.params;

  db.query('update answers set helpfulness = helpfulness + 1 where answer_id = $1', [ answer_id ])
  .then(res.sendStatus(200))
  .catch(res.sendStatus(400))
})


// Report Answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params;

  db.query('update answers set reported = true where answer_id = $1', [ answer_id ])
    .then(res.sendStatus(200))
    .catch(res.sendStatus(400))
})

app.listen(port, () => {
  console.log('listening at port', port);
});