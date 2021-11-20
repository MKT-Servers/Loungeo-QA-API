const express = require('express');
const db = require('./db');
const app = express();

const port = 3000;
app.use(express.json())

app.get('/qa/questions')
app.get('/qa/questions/:question_id/answers', (req, res) => {
  req.params.question_id = 1;
  let params = [ req.params.question_id ];
  console.log('qa questions : question_id/answers');
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

  db.query('select answer_id, body, to_timestamp(date_written/1000)::timestamp, answerer_name, helpfulness from answers where question_id = 1')
   .then(data => console.log(data))
   .catch(err => console.log(err));
})

// app.post('/qa/questions')
// app.post('/qa/questions/:question_id/answers')

// app.put('/qa/questions/:question_id/helpful')
// app.put('/qa/questions/:question_id/report')

// app.put('/qa/answers/:answer_id/helpul')
// app.put('/qa/answers/:answer_id/report')

app.listen(port, () => {
  console.log('listening at port', port);
});